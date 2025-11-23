/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Backgrounds
                bg: {
                    primary: '#FDF6ED',
                    secondary: '#FFFFFF',
                    tertiary: '#F5F2E9',
                    hover: '#FAF8F3',
                },
                // Text
                text: {
                    primary: '#4B5563',
                    secondary: '#6B7280',
                    tertiary: '#9CA3AF',
                    white: '#FFFFFF',
                },
                // Accents
                accent: {
                    blue: '#60A5FA',
                    green: '#4ADE80',
                    clay: '#B5764A',
                    sand: '#D6C3A5',
                },
                // Status
                status: {
                    success: '#4ADE80',
                    warning: '#FBBF24',
                    error: '#EF4444',
                    info: '#60A5FA',
                },
                // Borders
                border: {
                    light: '#E5E7EB',
                    medium: '#D6C3A5',
                    dark: '#9CA3AF',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'fade-in': 'fadeIn 0.4s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'slide-in': 'slideIn 0.3s ease-out',
                'shimmer': 'shimmer 1.5s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                slideIn: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
        },
    },
    plugins: [],
}
