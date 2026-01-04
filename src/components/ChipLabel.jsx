import React from 'react'

const ChipLabel = ({ name, visible }) => {
    if (!visible) return null

    return (
        <g className="chip-label">
            {/* Label background */}
            <rect
                x="-40"
                y="70"
                width="80"
                height="30"
                fill="#000000"
                stroke="#D4AF37"
                strokeWidth="1"
                rx="4"
                opacity="0.9"
            />

            {/* Label text */}
            <text
                x="0"
                y="90"
                fill="#ffd700"
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="monospace"
                className="smooth-transition"
            >
                {name}
            </text>
        </g>
    )
}

export default ChipLabel
