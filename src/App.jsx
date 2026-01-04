import React, { useState, useEffect } from 'react'
import CircuitBoard from './components/CircuitBoard'
import { generateDocumentation } from './api/documents'

function App() {
    const [prompt, setPrompt] = useState('')
    const [isBooting, setIsBooting] = useState(false)
    const [bootComplete, setBootComplete] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [showPrompt, setShowPrompt] = useState(true)
    const [generatedDocs, setGeneratedDocs] = useState(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [currentPrompt, setCurrentPrompt] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!prompt.trim() || isGenerating) return

        setCurrentPrompt(prompt)
        setShowPrompt(false)
        setIsBooting(true)
        setIsAnimating(true)
        setIsGenerating(true)

        try {
            // Generate documentation from the prompt
            const docs = await generateDocumentation(prompt)
            setGeneratedDocs(docs)
        } catch (error) {
            console.error('Generation failed:', error)
        } finally {
            setIsGenerating(false)
        }

        // Boot sequence timing
        setTimeout(() => {
            setBootComplete(true)
            setIsBooting(false)
        }, 2500)
    }

    // Allow re-triggering by pressing 'R'
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'r' || e.key === 'R') {
                setBootComplete(false)
                setIsBooting(false)
                setIsAnimating(false)
                setShowPrompt(true)
                setGeneratedDocs(null)
                setPrompt('')
                setCurrentPrompt('')
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div className="min-h-screen w-full bg-black overflow-hidden relative">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-gradient-radial from-amber-900/5 via-transparent to-transparent pointer-events-none" />

            {/* Scanline effect overlay */}
            <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />

            {/* Main motherboard container */}
            <div className="relative w-full h-screen flex items-center justify-center p-4">
                <div className={`relative w-full max-w-7xl transition-all duration-1000 ${bootComplete ? 'scale-100' : 'scale-98'}`}>
                    <CircuitBoard
                        isAnimating={isAnimating}
                        isBooting={isBooting}
                        bootComplete={bootComplete}
                        generatedDocs={generatedDocs}
                        userPrompt={currentPrompt}
                    />
                </div>
            </div>

            {/* Prompt input overlay */}
            {showPrompt && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-10">
                    <div className="text-center max-w-2xl px-4">
                        <div className="mb-8 power-icon-container">
                            <svg
                                className="w-20 h-20 mx-auto text-amber-500 power-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M12 2v10" strokeLinecap="round" />
                                <path d="M18.4 6.6a9 9 0 1 1-12.77.04" strokeLinecap="round" />
                            </svg>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-mono font-bold text-amber-500 mb-4 tracking-wider">
                            CIRCUIT FLOW
                        </h1>
                        <p className="text-lg text-amber-600/80 font-mono mb-8">
                            AI-Powered Documentation Generator
                        </p>

                        <form onSubmit={handleSubmit} className="mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Describe your project idea..."
                                    className="w-full px-6 py-4 bg-black/50 border-2 border-amber-500/50 rounded-lg 
                                             text-amber-100 font-mono text-lg placeholder-amber-700/50
                                             focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20
                                             transition-all duration-300"
                                    autoFocus
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!prompt.trim()}
                                className={`mt-6 inline-flex items-center gap-3 px-8 py-4 border-2 rounded-lg font-mono text-lg tracking-widest
                                          transition-all duration-300 ${prompt.trim()
                                        ? 'border-amber-500 text-amber-500 hover:bg-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer'
                                        : 'border-amber-800/50 text-amber-800/50 cursor-not-allowed'
                                    }`}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="5,3 19,12 5,21" fill="currentColor" />
                                </svg>
                                GENERATE DOCS
                            </button>
                        </form>

                        <div className="text-sm text-amber-700/60 font-mono space-y-1">
                            <p>Examples:</p>
                            <div className="flex flex-wrap justify-center gap-2 mt-2">
                                {[
                                    'Make me a SaaS dashboard',
                                    'Build a todo app with AI',
                                    'Create an e-commerce platform'
                                ].map((example, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setPrompt(example)}
                                        className="px-3 py-1 bg-amber-900/20 border border-amber-800/30 rounded text-amber-600/70 
                                                 hover:bg-amber-900/40 hover:border-amber-700/50 transition-all text-xs"
                                    >
                                        {example}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="text-xs text-amber-800/40 font-mono mt-8">
                            Press R to restart at any time
                        </p>
                    </div>
                </div>
            )}

            {/* Generating overlay */}
            {isGenerating && !showPrompt && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20 pointer-events-none">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-amber-500 font-mono text-lg">Generating documentation...</p>
                        <p className="text-amber-600/60 font-mono text-sm mt-2">"{currentPrompt}"</p>
                    </div>
                </div>
            )}

            {/* Status bar at bottom */}
            {bootComplete && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/90 border-t border-amber-900/50 py-2 px-4 z-10">
                    <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-xs">
                        <div className="text-amber-600 truncate max-w-[40%]">
                            <span className="text-amber-500">PROMPT:</span> {currentPrompt}
                        </div>
                        <div className="text-amber-700 hidden md:block">
                            Hover components to preview • Click to download
                        </div>
                        <div className="text-amber-600">
                            <span className="text-amber-500">DOCS:</span> {generatedDocs?.length || 0} GENERATED
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
