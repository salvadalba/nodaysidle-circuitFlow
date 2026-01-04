/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                pcb: {
                    black: '#000000',
                    gold: '#D4AF37',
                    neon: '#ffd700',
                    hot: '#ff4500',
                    warm: '#ff8c00',
                    cool: '#00bfff',
                    cold: '#00ffff',
                    terminal: '#00ff00',
                },
            },
            animation: {
                'pulse': 'pulse 2s ease-in-out forwards',
                'pulse-infinite': 'pulse 2s ease-in-out infinite',
                'float-up': 'float-up 1.5s ease-out forwards',
                'glow': 'glow 2s ease-in-out infinite',
            },
            keyframes: {
                pulse: {
                    '0%': { strokeDashoffset: '1000' },
                    '100%': { strokeDashoffset: '0' },
                },
                'float-up': {
                    '0%': {
                        transform: 'translateY(0)',
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'translateY(-50px)',
                        opacity: '0',
                    },
                },
                glow: {
                    '0%, 100%': {
                        filter: 'drop-shadow(0 0 10px #ffd700)',
                    },
                    '50%': {
                        filter: 'drop-shadow(0 0 20px #ffd700)',
                    },
                },
            },
        },
    },
    plugins: [],
}
