import React from 'react'

const CircuitTrace = ({ path, isActive, delay = 0 }) => {
    return (
        <g>
            {/* Shadow/glow layer */}
            <path
                d={path}
                stroke="#d4af37"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={isActive ? 0.3 : 0}
                filter={isActive ? 'url(#intenseGlow)' : undefined}
                style={{
                    transition: 'opacity 0.5s ease-in-out',
                    transitionDelay: `${delay}ms`,
                }}
            />

            {/* Main trace */}
            <path
                d={path}
                stroke={isActive ? '#ffd700' : '#3a3530'}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isActive ? 'trace-active' : ''}
                style={{
                    strokeDasharray: '1000',
                    strokeDashoffset: isActive ? '0' : '1000',
                    transition: isActive ? 'stroke-dashoffset 2s ease-in-out, stroke 0.5s ease-in-out' : 'none',
                    transitionDelay: `${delay}ms`,
                }}
            />

            {/* Pulse dot traveling along path */}
            {isActive && (
                <circle r="4" fill="#fff" filter="url(#intenseGlow)">
                    <animateMotion
                        dur="2s"
                        repeatCount="1"
                        begin={`${delay}ms`}
                        path={path}
                    />
                </circle>
            )}
        </g>
    )
}

export default CircuitTrace
