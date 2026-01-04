import React, { useState } from 'react'

const CableInput = ({ onConnect }) => {
    const [isConnected, setIsConnected] = useState(false)

    const handleClick = () => {
        if (isConnected) return
        setIsConnected(true)
        onConnect()
    }

    return (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center pl-8">
            {/* Cable connector visual */}
            <div
                className={`relative cursor-pointer transition-all duration-300 ${isConnected ? 'scale-110' : 'hover:scale-105'
                    }`}
                onClick={handleClick}
                role="button"
                tabIndex={0}
                aria-label={isConnected ? 'Cable connected' : 'Connect cable'}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleClick()
                    }
                }}
            >
                {/* Cable port */}
                <div
                    className={`w-16 h-24 rounded-lg border-4 flex items-center justify-center transition-all duration-300 ${isConnected
                            ? 'bg-pcb-gold border-pcb-neon shadow-lg shadow-pcb-neon'
                            : 'bg-pcb-black border-pcb-gold hover:border-pcb-neon'
                        }`}
                >
                    {/* Port inner circle */}
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isConnected ? 'bg-pcb-neon' : 'bg-pcb-gold'
                            }`}
                    >
                        {/* Connector pins */}
                        <div className="flex gap-2">
                            <div className="w-1 h-4 bg-pcb-gold rounded-full" />
                            <div className="w-1 h-4 bg-pcb-gold rounded-full" />
                            <div className="w-1 h-4 bg-pcb-gold rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Cable wire */}
                {!isConnected && (
                    <div className="absolute left-16 top-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-pcb-gold to-pcb-neon rounded-full" />
                )}

                {/* Status text */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
                    <p
                        className={`text-sm font-mono transition-all duration-300 ${isConnected ? 'text-pcb-neon' : 'text-pcb-gold'
                            }`}
                    >
                        {isConnected ? 'CONNECTED' : 'PLUG IN YOUR IDEA...'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CableInput
