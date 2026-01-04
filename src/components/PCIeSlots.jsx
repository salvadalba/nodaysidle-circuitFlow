import React from 'react'

const PCIeSlots = ({ x, y, isActive = false }) => {
    const slots = [
        { width: 200, height: 25, label: 'PCIE_X16', type: 'x16' },
        { width: 100, height: 20, label: 'PCIE_X4', type: 'x4' },
        { width: 200, height: 25, label: 'PCIE_X16_2', type: 'x16' }
    ]

    return (
        <g transform={`translate(${x}, ${y})`}>
            {/* Section label */}
            <text
                x={100}
                y={-15}
                fill="#d4af37"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
            >
                EXPANSION SLOTS
            </text>

            {slots.map((slot, i) => {
                const slotY = i * 45

                return (
                    <g key={`pcie-${i}`} transform={`translate(0, ${slotY})`}>
                        {/* Metal reinforcement housing */}
                        <rect
                            x={-5}
                            y={-3}
                            width={slot.width + 10}
                            height={slot.height + 6}
                            fill="#1a1a1a"
                            stroke="#2a2a2a"
                            strokeWidth="2"
                            rx="2"
                        />

                        {/* Slot body */}
                        <rect
                            x={0}
                            y={0}
                            width={slot.width}
                            height={slot.height}
                            fill="#0a0a0a"
                            stroke={isActive ? '#ffd700' : '#3a3a3a'}
                            strokeWidth="1"
                            rx="1"
                        />

                        {/* Gold contact fingers */}
                        <rect
                            x={5}
                            y={3}
                            width={slot.width - 10}
                            height={slot.height - 6}
                            fill="url(#goldGradient)"
                            rx="1"
                        />

                        {/* Key notch */}
                        <rect
                            x={slot.width * 0.3}
                            y={0}
                            width={8}
                            height={slot.height}
                            fill="#0a0a0a"
                        />

                        {/* Contact finger lines */}
                        {Array.from({ length: Math.floor(slot.width / 8) }, (_, j) => (
                            <line
                                key={`finger-${j}`}
                                x1={10 + j * 8}
                                y1={5}
                                x2={10 + j * 8}
                                y2={slot.height - 5}
                                stroke="#0a0a0a"
                                strokeWidth="1"
                            />
                        ))}

                        {/* Slot label */}
                        <text
                            x={slot.width + 15}
                            y={slot.height / 2 + 4}
                            fill="#555"
                            fontSize="8"
                            fontFamily="monospace"
                        >
                            {slot.label}
                        </text>

                        {/* Retention clip left */}
                        <rect
                            x={-8}
                            y={slot.height / 2 - 5}
                            width={5}
                            height={10}
                            fill="#2a2a2a"
                            rx="1"
                        />

                        {/* Retention clip right */}
                        <rect
                            x={slot.width + 3}
                            y={slot.height / 2 - 5}
                            width={5}
                            height={10}
                            fill="#2a2a2a"
                            rx="1"
                        />

                        {/* Active glow */}
                        {isActive && (
                            <rect
                                x={-6}
                                y={-4}
                                width={slot.width + 12}
                                height={slot.height + 8}
                                fill="none"
                                stroke="#ffd700"
                                strokeWidth="1"
                                rx="3"
                                filter="url(#glow)"
                                className="rhythmic-pulse"
                            />
                        )}
                    </g>
                )
            })}
        </g>
    )
}

export default PCIeSlots
