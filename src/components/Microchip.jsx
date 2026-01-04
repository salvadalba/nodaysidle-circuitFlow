import React, { useState } from 'react'
import ChipLabel from './ChipLabel'
import useDownloadAnimation from '../hooks/useDownloadAnimation'

const Microchip = ({ id, name, x, y, type, onHover, onClick }) => {
    const [isHovering, setIsHovering] = useState(false)
    const [particles, setParticles] = useState([])
    const { isDownloading, progress, isComplete } = useDownloadAnimation()

    const handleMouseEnter = () => {
        setIsHovering(true)
        onHover && onHover(id)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
    }

    const handleClick = () => {
        if (isDownloading || isComplete) return
        onClick && onClick(id)
        startDownload(id)
    }

    // Generate particles on hover
    React.useEffect(() => {
        if (!isHovering) return

        const interval = setInterval(() => {
            const newParticle = {
                id: Date.now() + Math.random(),
                x: (type === 'cpu' ? 0 : 0) + (Math.random() - 0.5) * 40,
                y: (type === 'cpu' ? -60 : -50) + (Math.random() - 0.5) * 20,
                value: Math.random() > 0.5 ? '1' : '0',
                opacity: 1,
            }
            setParticles(prev => [...prev.slice(-29), newParticle])
        }, 100)

        return () => clearInterval(interval)
    }, [isHovering, type])

    // Remove particles after animation
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setParticles(prev => prev.filter(p => p.opacity > 0))
        }, 1500)
        return () => clearTimeout(timeout)
    }, [particles])

    const chipWidth = type === 'cpu' ? 120 : 100
    const chipHeight = type === 'cpu' ? 120 : 100

    // Generate pins based on chip type
    const renderPins = () => {
        const pins = []
        const pinCount = type === 'cpu' ? 16 : type === 'memory' ? 24 : 12
        const pinSpacing = chipWidth / (pinCount / 2)

        for (let i = 0; i < pinCount; i++) {
            const isTop = i < pinCount / 2
            pins.push(
                <rect
                    key={i}
                    x={isTop ? (i * pinSpacing) + 5 : (i * pinSpacing) + 5}
                    y={isTop ? -5 : chipHeight}
                    width="6"
                    height="5"
                    fill="#D4AF37"
                />
            )
        }
        return pins
    }

    // Render chip body pattern based on type
    const renderChipPattern = () => {
        switch (type) {
            case 'cpu':
                return (
                    <g>
                        <rect x="10" y="10" width={chipWidth - 20} height={chipHeight - 20} fill="#2a2a2a" />
                        <circle cx={chipWidth / 2} cy={chipHeight / 2} r="20" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="2" />
                        <rect x={chipWidth / 2 - 15} y={chipHeight / 2 - 15} width="30" height="30" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="1" />
                    </g>
                )
            case 'memory':
                return (
                    <g>
                        {Array.from({ length: 4 }, (_, i) => (
                            <rect
                                key={i}
                                x={15 + (i % 2) * 35}
                                y={15 + Math.floor(i / 2) * 25}
                                width="30"
                                height="20"
                                fill="#2a2a2a"
                                stroke="#D4AF37"
                                strokeWidth="1"
                            />
                        ))}
                    </g>
                )
            case 'gpu':
                return (
                    <g>
                        {Array.from({ length: 8 }, (_, i) => (
                            <rect
                                key={i}
                                x={10}
                                y={10 + i * 10}
                                width={chipWidth - 20}
                                height="8"
                                fill="#2a2a2a"
                                stroke="#D4AF37"
                                strokeWidth="1"
                            />
                        ))}
                    </g>
                )
            case 'io':
                return (
                    <g>
                        <rect x="10" y="10" width={chipWidth - 20} height={chipHeight - 20} fill="#2a2a2a" />
                        {Array.from({ length: 6 }, (_, i) => (
                            <circle
                                key={i}
                                cx={20 + i * 15}
                                cy={25}
                                r="5"
                                fill="#1a1a1a"
                                stroke="#D4AF37"
                                strokeWidth="1"
                            />
                        ))}
                    </g>
                )
            case 'storage':
                return (
                    <g>
                        <rect x="10" y="10" width={chipWidth - 20} height={chipHeight - 20} fill="#2a2a2a" />
                        {Array.from({ length: 4 }, (_, i) => (
                            <rect
                                key={i}
                                x={15 + (i % 2) * 35}
                                y={15 + Math.floor(i / 2) * 25}
                                width="30"
                                height="20"
                                fill="#1a1a1a"
                                stroke="#D4AF37"
                                strokeWidth="1"
                            />
                        ))}
                    </g>
                )
            default:
                return null
        }
    }

    return (
        <g
            transform={`translate(${x}, ${y})`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            aria-label={`Download ${name}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleClick()
                }
            }}
        >
            {/* Chip body */}
            <rect
                x={type === 'cpu' ? -60 : -50}
                y={type === 'cpu' ? -60 : -50}
                width={chipWidth}
                height={chipHeight}
                fill={isDownloading || isComplete ? '#00bfff' : isHovering ? '#ff4500' : '#1a1a1a'}
                stroke="#D4AF37"
                strokeWidth="2"
                className={`smooth-transition ${isHovering && !isDownloading && !isComplete ? 'thermal-glow' : ''} ${isDownloading || isComplete ? 'cool-down' : ''}`}
            />

            {/* Progress bar for download */}
            {isDownloading && (
                <rect
                    x={type === 'cpu' ? -60 : -50}
                    y={type === 'cpu' ? -60 : -50}
                    width={chipWidth * (progress / 100)}
                    height={chipHeight}
                    fill="#00ffff"
                    opacity="0.5"
                    className="progress-bar"
                />
            )}

            {/* Download complete indicator */}
            {isComplete && (
                <text
                    x={type === 'cpu' ? 0 : 0}
                    y={type === 'cpu' ? 5 : 5}
                    fill="#00ffff"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                >
                    ✓
                </text>
            )}

            {/* Chip pattern */}
            {renderChipPattern()}

            {/* Pins */}
            {renderPins()}

            {/* Chip label */}
            <ChipLabel name={name} visible={isHovering} />

            {/* Binary particles */}
            {particles.map(p => (
                <text
                    key={p.id}
                    x={p.x}
                    y={p.y}
                    fill={Math.random() > 0.5 ? '#00ff00' : '#ffd700'}
                    fontSize="12"
                    fontFamily="monospace"
                    opacity={p.opacity}
                    className="particle-animate"
                    style={{
                        animationDelay: `${Math.random() * 500}ms`,
                    }}
                >
                    {p.value}
                </text>
            ))}
        </g>
    )
}

export default Microchip
