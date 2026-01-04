import React, { useState, useEffect } from 'react'

const DebugDisplay = ({ x, y, isBooting = false, bootComplete = false }) => {
    const [displayCode, setDisplayCode] = useState('--')
    const [dotActive, setDotActive] = useState(false)

    // Boot sequence codes
    const bootCodes = [
        '00', '01', '02', '10', '15', '19', '24', '32', '36', '4F',
        '52', '60', '6A', '74', '92', 'A0', 'A2', 'A4', 'A7', 'AA'
    ]

    useEffect(() => {
        if (!isBooting) {
            setDisplayCode(bootComplete ? 'AA' : '--')
            return
        }

        let codeIndex = 0
        const interval = setInterval(() => {
            setDisplayCode(bootCodes[codeIndex])
            setDotActive(prev => !prev)
            codeIndex++

            if (codeIndex >= bootCodes.length) {
                clearInterval(interval)
                setDisplayCode('AA')
            }
        }, 100)

        return () => clearInterval(interval)
    }, [isBooting, bootComplete])

    // Seven segment display digit rendering
    const SevenSegment = ({ digit, offsetX }) => {
        const segments = {
            '0': [1, 1, 1, 1, 1, 1, 0],
            '1': [0, 1, 1, 0, 0, 0, 0],
            '2': [1, 1, 0, 1, 1, 0, 1],
            '3': [1, 1, 1, 1, 0, 0, 1],
            '4': [0, 1, 1, 0, 0, 1, 1],
            '5': [1, 0, 1, 1, 0, 1, 1],
            '6': [1, 0, 1, 1, 1, 1, 1],
            '7': [1, 1, 1, 0, 0, 0, 0],
            '8': [1, 1, 1, 1, 1, 1, 1],
            '9': [1, 1, 1, 1, 0, 1, 1],
            'A': [1, 1, 1, 0, 1, 1, 1],
            'B': [0, 0, 1, 1, 1, 1, 1],
            'C': [1, 0, 0, 1, 1, 1, 0],
            'D': [0, 1, 1, 1, 1, 0, 1],
            'E': [1, 0, 0, 1, 1, 1, 1],
            'F': [1, 0, 0, 0, 1, 1, 1],
            '-': [0, 0, 0, 0, 0, 0, 1],
        }

        const seg = segments[digit] || segments['-']
        const onColor = '#ff3300'
        const offColor = '#1a0000'
        const w = 12
        const h = 20
        const t = 3

        return (
            <g transform={`translate(${offsetX}, 0)`}>
                {/* Segment A - top */}
                <rect x={t} y={0} width={w - 2 * t} height={t} fill={seg[0] ? onColor : offColor} filter={seg[0] ? 'url(#glow)' : undefined} />
                {/* Segment B - top right */}
                <rect x={w - t} y={t} width={t} height={(h - 3 * t) / 2} fill={seg[1] ? onColor : offColor} filter={seg[1] ? 'url(#glow)' : undefined} />
                {/* Segment C - bottom right */}
                <rect x={w - t} y={h / 2 + t / 2} width={t} height={(h - 3 * t) / 2} fill={seg[2] ? onColor : offColor} filter={seg[2] ? 'url(#glow)' : undefined} />
                {/* Segment D - bottom */}
                <rect x={t} y={h - t} width={w - 2 * t} height={t} fill={seg[3] ? onColor : offColor} filter={seg[3] ? 'url(#glow)' : undefined} />
                {/* Segment E - bottom left */}
                <rect x={0} y={h / 2 + t / 2} width={t} height={(h - 3 * t) / 2} fill={seg[4] ? onColor : offColor} filter={seg[4] ? 'url(#glow)' : undefined} />
                {/* Segment F - top left */}
                <rect x={0} y={t} width={t} height={(h - 3 * t) / 2} fill={seg[5] ? onColor : offColor} filter={seg[5] ? 'url(#glow)' : undefined} />
                {/* Segment G - middle */}
                <rect x={t} y={h / 2 - t / 2} width={w - 2 * t} height={t} fill={seg[6] ? onColor : offColor} filter={seg[6] ? 'url(#glow)' : undefined} />
            </g>
        )
    }

    return (
        <g transform={`translate(${x}, ${y})`}>
            {/* Display housing */}
            <rect
                x={-5}
                y={-5}
                width={50}
                height={35}
                fill="#0a0a0a"
                stroke="#2a2a2a"
                strokeWidth="2"
                rx="3"
            />

            {/* Display window */}
            <rect
                x={0}
                y={0}
                width={40}
                height={25}
                fill="#0f0000"
                stroke="#1a1a1a"
                strokeWidth="1"
                rx="2"
            />

            {/* Seven segment digits */}
            <g transform="translate(5, 2)">
                <SevenSegment digit={displayCode[0]} offsetX={0} />
                <SevenSegment digit={displayCode[1]} offsetX={16} />
            </g>

            {/* Status dot */}
            <circle
                cx={45}
                cy={12}
                r={3}
                fill={dotActive && isBooting ? '#ff3300' : '#1a0000'}
                filter={dotActive && isBooting ? 'url(#glow)' : undefined}
            />

            {/* Label */}
            <text
                x={20}
                y={40}
                fill="#555"
                fontSize="7"
                fontFamily="monospace"
                textAnchor="middle"
            >
                POST CODE
            </text>
        </g>
    )
}

export default DebugDisplay
