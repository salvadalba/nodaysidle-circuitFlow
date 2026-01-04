import React, { useState } from 'react'

const RAMSlots = ({ x, y, isActive = false, onHover, onClick }) => {
    const [hoveredSlot, setHoveredSlot] = useState(null)
    const slotCount = 4
    const slotWidth = 20
    const slotHeight = 180
    const slotGap = 8

    const slotLabels = ['DIMM_A1', 'DIMM_A2', 'DIMM_B1', 'DIMM_B2']
    const documents = [
        { id: 'trd', name: 'TRD.md', desc: 'TECHNICAL REQUIREMENTS' },
        { id: 'architecture', name: 'Architecture', desc: 'SYSTEM ARCHITECTURE' },
        { id: 'api-spec', name: 'API Spec', desc: 'API SPECIFICATION' },
        { id: 'deployment', name: 'Deployment', desc: 'DEPLOYMENT GUIDE' }
    ]

    const handleSlotHover = (index) => {
        setHoveredSlot(index)
        onHover && onHover(documents[index]?.id)
    }

    const handleSlotClick = (index) => {
        onClick && onClick(documents[index]?.id)
    }

    return (
        <g transform={`translate(${x}, ${y})`}>
            {/* RAM slot area label */}
            <text
                x={(slotWidth + slotGap) * slotCount / 2}
                y={-20}
                fill="#d4af37"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
            >
                DDR5 MEMORY
            </text>

            {/* Slot bank housing */}
            <rect
                x={-10}
                y={-10}
                width={(slotWidth + slotGap) * slotCount + 12}
                height={slotHeight + 20}
                fill="#0f0f0f"
                stroke="#252525"
                strokeWidth="1"
                rx="4"
            />

            {/* Individual RAM slots */}
            {Array.from({ length: slotCount }, (_, i) => {
                const slotX = i * (slotWidth + slotGap)
                const isHovered = hoveredSlot === i
                const doc = documents[i]

                return (
                    <g
                        key={`ram-slot-${i}`}
                        transform={`translate(${slotX}, 0)`}
                        onMouseEnter={() => handleSlotHover(i)}
                        onMouseLeave={() => setHoveredSlot(null)}
                        onClick={() => handleSlotClick(i)}
                        style={{ cursor: 'pointer' }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Download ${doc?.name}`}
                    >
                        {/* Slot body */}
                        <rect
                            x={0}
                            y={0}
                            width={slotWidth}
                            height={slotHeight}
                            fill={isHovered ? '#ff4500' : '#1a1a1a'}
                            stroke={isActive || isHovered ? '#ffd700' : '#3a3a3a'}
                            strokeWidth={isHovered ? 2 : 1}
                            rx="2"
                            className={`smooth-transition ${isHovered ? 'thermal-glow' : ''}`}
                            filter={isHovered ? 'url(#glow)' : undefined}
                        />

                        {/* Gold edge connector contacts */}
                        <rect
                            x={2}
                            y={slotHeight - 30}
                            width={slotWidth - 4}
                            height={25}
                            fill="url(#goldGradient)"
                            rx="1"
                        />

                        {/* Contact lines */}
                        {Array.from({ length: 8 }, (_, j) => (
                            <line
                                key={`contact-${j}`}
                                x1={slotWidth / 2}
                                y1={slotHeight - 28 + j * 3}
                                x2={slotWidth / 2}
                                y2={slotHeight - 26 + j * 3}
                                stroke="#0a0a0a"
                                strokeWidth="2"
                            />
                        ))}

                        {/* Latch mechanism top */}
                        <rect
                            x={-2}
                            y={-5}
                            width={slotWidth + 4}
                            height={8}
                            fill="#2a2a2a"
                            stroke="#3a3a3a"
                            strokeWidth="1"
                            rx="1"
                        />

                        {/* Latch mechanism bottom */}
                        <rect
                            x={-2}
                            y={slotHeight - 3}
                            width={slotWidth + 4}
                            height={8}
                            fill="#2a2a2a"
                            stroke="#3a3a3a"
                            strokeWidth="1"
                            rx="1"
                        />

                        {/* Slot label */}
                        <text
                            x={slotWidth / 2}
                            y={slotHeight + 18}
                            fill="#555"
                            fontSize="6"
                            fontFamily="monospace"
                            textAnchor="middle"
                        >
                            {slotLabels[i]}
                        </text>

                        {/* Document name (vertical) */}
                        <text
                            x={slotWidth / 2}
                            y={slotHeight / 2}
                            fill={isHovered ? '#fff' : '#666'}
                            fontSize="8"
                            fontFamily="monospace"
                            textAnchor="middle"
                            transform={`rotate(-90, ${slotWidth / 2}, ${slotHeight / 2})`}
                            className="smooth-transition"
                        >
                            {doc?.name}
                        </text>

                        {/* Hover tooltip */}
                        {isHovered && (
                            <g>
                                <rect
                                    x={-60}
                                    y={slotHeight / 2 - 20}
                                    width={55}
                                    height={40}
                                    fill="#0a0a0a"
                                    stroke="#ffd700"
                                    strokeWidth="1"
                                    rx="4"
                                />
                                <text
                                    x={-32}
                                    y={slotHeight / 2 - 5}
                                    fill="#ffd700"
                                    fontSize="8"
                                    fontFamily="monospace"
                                    textAnchor="middle"
                                >
                                    {doc?.name}
                                </text>
                                <text
                                    x={-32}
                                    y={slotHeight / 2 + 8}
                                    fill="#888"
                                    fontSize="6"
                                    fontFamily="monospace"
                                    textAnchor="middle"
                                >
                                    CLICK TO
                                </text>
                                <text
                                    x={-32}
                                    y={slotHeight / 2 + 16}
                                    fill="#888"
                                    fontSize="6"
                                    fontFamily="monospace"
                                    textAnchor="middle"
                                >
                                    DOWNLOAD
                                </text>
                            </g>
                        )}

                        {/* Active glow */}
                        {isActive && (
                            <rect
                                x={-2}
                                y={-2}
                                width={slotWidth + 4}
                                height={slotHeight + 4}
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

export default RAMSlots
