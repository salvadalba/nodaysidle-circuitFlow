import React from 'react'

const VRMHeatsink = ({ x, y, width, height, orientation = 'horizontal', isActive = false }) => {
    const finCount = orientation === 'horizontal' ? Math.floor(width / 12) : Math.floor(height / 12)

    // Generate angular fin cuts
    const renderFins = () => {
        const fins = []
        for (let i = 0; i < finCount; i++) {
            const offset = i * 12
            if (orientation === 'horizontal') {
                fins.push(
                    <g key={`fin-${i}`}>
                        {/* Main fin body */}
                        <rect
                            x={offset}
                            y={0}
                            width={10}
                            height={height}
                            fill="url(#heatsinkGradient)"
                        />
                        {/* Angular cut at top */}
                        <polygon
                            points={`${offset},0 ${offset + 10},0 ${offset + 10},${height * 0.15} ${offset},${height * 0.25}`}
                            fill="#0a0a0a"
                        />
                        {/* Angular cut at bottom */}
                        <polygon
                            points={`${offset},${height} ${offset + 10},${height} ${offset + 10},${height * 0.85} ${offset},${height * 0.75}`}
                            fill="#0a0a0a"
                        />
                        {/* Highlight line */}
                        <line
                            x1={offset + 2}
                            y1={height * 0.3}
                            x2={offset + 2}
                            y2={height * 0.7}
                            stroke="#3a3a3a"
                            strokeWidth="1"
                        />
                    </g>
                )
            } else {
                fins.push(
                    <g key={`fin-${i}`}>
                        <rect
                            x={0}
                            y={offset}
                            width={width}
                            height={10}
                            fill="url(#heatsinkGradient)"
                        />
                        <polygon
                            points={`0,${offset} 0,${offset + 10} ${width * 0.15},${offset + 10} ${width * 0.25},${offset}`}
                            fill="#0a0a0a"
                        />
                        <polygon
                            points={`${width},${offset} ${width},${offset + 10} ${width * 0.85},${offset + 10} ${width * 0.75},${offset}`}
                            fill="#0a0a0a"
                        />
                        <line
                            x1={width * 0.3}
                            y1={offset + 2}
                            x2={width * 0.7}
                            y2={offset + 2}
                            stroke="#3a3a3a"
                            strokeWidth="1"
                        />
                    </g>
                )
            }
        }
        return fins
    }

    return (
        <g transform={`translate(${x}, ${y})`} className={isActive ? 'vrm-active' : ''}>
            {/* Base plate */}
            <rect
                x={-4}
                y={-4}
                width={width + 8}
                height={height + 8}
                fill="#151515"
                rx="2"
            />

            {/* Thermal interface outline */}
            <rect
                x={-2}
                y={-2}
                width={width + 4}
                height={height + 4}
                fill="none"
                stroke="#252525"
                strokeWidth="1"
            />

            {/* Fins */}
            {renderFins()}

            {/* Golden mounting screws */}
            {[
                { sx: -2, sy: -2 },
                { sx: width + 2, sy: -2 },
                { sx: -2, sy: height + 2 },
                { sx: width + 2, sy: height + 2 }
            ].map((screw, i) => (
                <g key={`screw-${i}`}>
                    <circle cx={screw.sx} cy={screw.sy} r="5" fill="#1a1a1a" />
                    <circle cx={screw.sx} cy={screw.sy} r="4" fill="url(#goldGradient)" />
                    {/* Phillips head */}
                    <line x1={screw.sx - 2} y1={screw.sy} x2={screw.sx + 2} y2={screw.sy} stroke="#0a0a0a" strokeWidth="1" />
                    <line x1={screw.sx} y1={screw.sy - 2} x2={screw.sx} y2={screw.sy + 2} stroke="#0a0a0a" strokeWidth="1" />
                </g>
            ))}

            {/* Brand label */}
            <rect
                x={width / 2 - 25}
                y={height / 2 - 8}
                width="50"
                height="16"
                fill="#0a0a0a"
                rx="2"
            />
            <text
                x={width / 2}
                y={height / 2 + 4}
                fill="#d4af37"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
            >
                DARK
            </text>

            {/* Thermal glow effect when active */}
            {isActive && (
                <rect
                    x={-4}
                    y={-4}
                    width={width + 8}
                    height={height + 8}
                    fill="none"
                    stroke="#ff4500"
                    strokeWidth="2"
                    filter="url(#glow)"
                    className="thermal-pulse"
                />
            )}
        </g>
    )
}

export default VRMHeatsink
