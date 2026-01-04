import React from 'react'

const MotherboardBackground = () => {
    // Generate random via holes for PCB detail
    const viaHoles = React.useMemo(() => {
        const holes = []
        for (let i = 0; i < 80; i++) {
            holes.push({
                x: Math.random() * 1200,
                y: Math.random() * 900,
                r: 2 + Math.random() * 2
            })
        }
        return holes
    }, [])

    // Generate random SMD components
    const smdComponents = React.useMemo(() => {
        const components = []
        for (let i = 0; i < 60; i++) {
            components.push({
                x: 100 + Math.random() * 1000,
                y: 100 + Math.random() * 700,
                w: 6 + Math.random() * 8,
                h: 3 + Math.random() * 4,
                rotation: Math.random() > 0.5 ? 0 : 90
            })
        }
        return components
    }, [])

    // Generate silkscreen labels
    const silkscreenLabels = [
        { x: 80, y: 120, text: 'C101', size: 8 },
        { x: 180, y: 280, text: 'R204', size: 8 },
        { x: 320, y: 150, text: 'U1', size: 10 },
        { x: 450, y: 720, text: 'C302', size: 8 },
        { x: 890, y: 180, text: 'D1', size: 8 },
        { x: 1050, y: 350, text: 'R15', size: 8 },
        { x: 750, y: 820, text: 'C501', size: 8 },
        { x: 200, y: 750, text: 'Q1', size: 10 },
    ]

    return (
        <g className="motherboard-background">
            {/* Main PCB base - dark matte black */}
            <rect width="1200" height="900" fill="#0a0a0a" />

            {/* Subtle PCB texture grid */}
            <defs>
                <pattern id="pcbGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#151515" strokeWidth="0.5" />
                </pattern>
                <pattern id="tracePattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="20" x2="40" y2="20" stroke="#1a1a1a" strokeWidth="1" />
                    <line x1="20" y1="0" x2="20" y2="40" stroke="#1a1a1a" strokeWidth="1" />
                </pattern>

                {/* Metallic gradient for heatsinks */}
                <linearGradient id="heatsinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2a2a2a" />
                    <stop offset="50%" stopColor="#1a1a1a" />
                    <stop offset="100%" stopColor="#0f0f0f" />
                </linearGradient>

                {/* Gold gradient for accents */}
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="50%" stopColor="#ffd700" />
                    <stop offset="100%" stopColor="#b8860b" />
                </linearGradient>

                {/* Glowing effect filter */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Intense glow for active elements */}
                <filter id="intenseGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Apply grid pattern */}
            <rect width="1200" height="900" fill="url(#pcbGrid)" opacity="0.8" />
            <rect width="1200" height="900" fill="url(#tracePattern)" opacity="0.3" />

            {/* PCB via holes - small copper circles */}
            {viaHoles.map((hole, i) => (
                <g key={`via-${i}`}>
                    <circle cx={hole.x} cy={hole.y} r={hole.r + 1} fill="#1a1a1a" />
                    <circle cx={hole.x} cy={hole.y} r={hole.r} fill="#2a2520" />
                    <circle cx={hole.x} cy={hole.y} r={hole.r - 1} fill="#0a0a0a" />
                </g>
            ))}

            {/* SMD resistors and capacitors scatter */}
            {smdComponents.map((comp, i) => (
                <g key={`smd-${i}`} transform={`translate(${comp.x}, ${comp.y}) rotate(${comp.rotation})`}>
                    <rect
                        x={-comp.w / 2}
                        y={-comp.h / 2}
                        width={comp.w}
                        height={comp.h}
                        fill="#1a1a1a"
                        stroke="#2a2a2a"
                        strokeWidth="0.5"
                    />
                    {/* Solder pads */}
                    <rect x={-comp.w / 2} y={-comp.h / 2} width={comp.w * 0.3} height={comp.h} fill="#3a3530" />
                    <rect x={comp.w / 2 - comp.w * 0.3} y={-comp.h / 2} width={comp.w * 0.3} height={comp.h} fill="#3a3530" />
                </g>
            ))}

            {/* Silkscreen reference designators */}
            {silkscreenLabels.map((label, i) => (
                <text
                    key={`label-${i}`}
                    x={label.x}
                    y={label.y}
                    fill="#3a3a3a"
                    fontSize={label.size}
                    fontFamily="monospace"
                >
                    {label.text}
                </text>
            ))}

            {/* Mounting holes with gold rings */}
            {[
                { x: 40, y: 40 },
                { x: 1160, y: 40 },
                { x: 40, y: 860 },
                { x: 1160, y: 860 },
                { x: 600, y: 450 }
            ].map((hole, i) => (
                <g key={`mount-${i}`}>
                    <circle cx={hole.x} cy={hole.y} r="12" fill="#1a1a1a" />
                    <circle cx={hole.x} cy={hole.y} r="10" fill="url(#goldGradient)" />
                    <circle cx={hole.x} cy={hole.y} r="5" fill="#0a0a0a" />
                </g>
            ))}

            {/* Board edge with chamfered corners */}
            <rect
                x="2"
                y="2"
                width="1196"
                height="896"
                fill="none"
                stroke="#1f1f1f"
                strokeWidth="4"
                rx="8"
            />

            {/* Inner trace border */}
            <rect
                x="20"
                y="20"
                width="1160"
                height="860"
                fill="none"
                stroke="#252525"
                strokeWidth="1"
                strokeDasharray="10 5"
            />
        </g>
    )
}

export default MotherboardBackground
