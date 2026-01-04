import React, { useState } from 'react'

const CPUSocket = ({ x, y, isActive = false, onHover, onClick }) => {
    const [isHovering, setIsHovering] = useState(false)
    const [particles, setParticles] = useState([])

    const socketSize = 180
    const cpuSize = 140
    const pinGridSize = 15

    // Generate LGA pin grid
    const renderPinGrid = () => {
        const pins = []
        const rows = pinGridSize
        const cols = pinGridSize
        const spacing = (socketSize - 30) / rows

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // Skip corners for realistic LGA pattern
                const isCorner = (row < 2 && col < 2) ||
                    (row < 2 && col > cols - 3) ||
                    (row > rows - 3 && col < 2) ||
                    (row > rows - 3 && col > cols - 3)

                if (!isCorner) {
                    pins.push(
                        <rect
                            key={`pin-${row}-${col}`}
                            x={15 + col * spacing}
                            y={15 + row * spacing}
                            width={spacing * 0.6}
                            height={spacing * 0.6}
                            fill={isActive ? '#ffd700' : '#3a3530'}
                            rx="0.5"
                        />
                    )
                }
            }
        }
        return pins
    }

    // Generate particles on hover
    React.useEffect(() => {
        if (!isHovering) {
            setParticles([])
            return
        }

        const interval = setInterval(() => {
            const newParticle = {
                id: Date.now() + Math.random(),
                x: cpuSize / 2 + (Math.random() - 0.5) * cpuSize,
                y: -20 + (Math.random() - 0.5) * 10,
                value: Math.random() > 0.5 ? '1' : '0',
            }
            setParticles(prev => [...prev.slice(-25), newParticle])
        }, 80)

        return () => clearInterval(interval)
    }, [isHovering])

    const handleMouseEnter = () => {
        setIsHovering(true)
        onHover && onHover('cpu')
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
    }

    const handleClick = () => {
        onClick && onClick('prd')
    }

    return (
        <g
            transform={`translate(${x - socketSize / 2}, ${y - socketSize / 2})`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            aria-label="Download PRD.md - CPU Socket"
        >
            {/* Socket base plate */}
            <rect
                x={-10}
                y={-10}
                width={socketSize + 20}
                height={socketSize + 20}
                fill="#1a1a1a"
                stroke="#252525"
                strokeWidth="2"
                rx="4"
            />

            {/* Socket retention bracket */}
            <rect
                x={-5}
                y={-5}
                width={socketSize + 10}
                height={socketSize + 10}
                fill="none"
                stroke="#2a2a2a"
                strokeWidth="4"
                rx="2"
            />

            {/* Pin grid area */}
            <rect
                x={0}
                y={0}
                width={socketSize}
                height={socketSize}
                fill="#0a0a0a"
                stroke="#1a1a1a"
                strokeWidth="1"
            />

            {/* LGA Pin Grid */}
            {renderPinGrid()}

            {/* CPU IHS (Integrated Heat Spreader) */}
            <g transform={`translate(${(socketSize - cpuSize) / 2}, ${(socketSize - cpuSize) / 2})`}>
                {/* IHS base */}
                <rect
                    width={cpuSize}
                    height={cpuSize}
                    fill={isHovering ? '#ff4500' : '#1a1a1a'}
                    stroke={isActive ? '#ffd700' : '#3a3a3a'}
                    strokeWidth="3"
                    rx="4"
                    className={`smooth-transition ${isHovering ? 'thermal-glow' : ''}`}
                    filter={isHovering ? 'url(#intenseGlow)' : undefined}
                />

                {/* IHS nickel plating effect */}
                <rect
                    x={8}
                    y={8}
                    width={cpuSize - 16}
                    height={cpuSize - 16}
                    fill="none"
                    stroke="#4a4a4a"
                    strokeWidth="1"
                    rx="2"
                />

                {/* Brand area */}
                <rect
                    x={cpuSize / 2 - 45}
                    y={20}
                    width={90}
                    height={24}
                    fill="#0a0a0a"
                    rx="2"
                />

                {/* KINGPIN branding */}
                <text
                    x={cpuSize / 2}
                    y={38}
                    fill="#d4af37"
                    fontSize="14"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                    filter={isActive ? 'url(#glow)' : undefined}
                >
                    KINGPIN
                </text>

                {/* Model number */}
                <text
                    x={cpuSize / 2}
                    y={cpuSize / 2 + 5}
                    fill="#666"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                >
                    PRD.md
                </text>

                {/* Processor specs */}
                <text
                    x={cpuSize / 2}
                    y={cpuSize - 25}
                    fill="#555"
                    fontSize="8"
                    fontFamily="monospace"
                    textAnchor="middle"
                >
                    PRODUCT REQUIREMENTS
                </text>

                {/* Corner markers */}
                {[
                    { cx: 12, cy: 12 },
                    { cx: cpuSize - 12, cy: 12 },
                    { cx: 12, cy: cpuSize - 12 },
                    { cx: cpuSize - 12, cy: cpuSize - 12 }
                ].map((corner, i) => (
                    <circle
                        key={`corner-${i}`}
                        cx={corner.cx}
                        cy={corner.cy}
                        r="4"
                        fill="#2a2a2a"
                        stroke={isActive ? '#ffd700' : '#3a3a3a'}
                        strokeWidth="1"
                    />
                ))}
            </g>

            {/* Mounting holes */}
            {[
                { hx: -15, hy: -15 },
                { hx: socketSize + 15, hy: -15 },
                { hx: -15, hy: socketSize + 15 },
                { hx: socketSize + 15, hy: socketSize + 15 }
            ].map((hole, i) => (
                <g key={`mount-${i}`}>
                    <circle cx={hole.hx} cy={hole.hy} r="8" fill="#1a1a1a" />
                    <circle cx={hole.hx} cy={hole.hy} r="6" fill="url(#goldGradient)" />
                    <circle cx={hole.hx} cy={hole.hy} r="3" fill="#0a0a0a" />
                </g>
            ))}

            {/* Binary data particles */}
            {particles.map(p => (
                <text
                    key={p.id}
                    x={(socketSize - cpuSize) / 2 + p.x}
                    y={(socketSize - cpuSize) / 2 + p.y}
                    fill={Math.random() > 0.5 ? '#00ff00' : '#ffd700'}
                    fontSize="12"
                    fontFamily="monospace"
                    className="particle-animate"
                >
                    {p.value}
                </text>
            ))}

            {/* Active glow ring */}
            {isActive && (
                <rect
                    x={-12}
                    y={-12}
                    width={socketSize + 24}
                    height={socketSize + 24}
                    fill="none"
                    stroke="#ffd700"
                    strokeWidth="2"
                    rx="6"
                    filter="url(#intenseGlow)"
                    className="rhythmic-pulse"
                />
            )}
        </g>
    )
}

export default CPUSocket
