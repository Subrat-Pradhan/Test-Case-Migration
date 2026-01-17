/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'rgb(59, 130, 246)',
                    light: 'rgb(96, 165, 250)',
                    dark: 'rgb(37, 99, 235)',
                },
                secondary: {
                    DEFAULT: 'rgb(139, 92, 246)',
                    light: 'rgb(167, 139, 250)',
                    dark: 'rgb(109, 40, 217)',
                },
                accent: {
                    DEFAULT: 'rgb(236, 72, 153)',
                    light: 'rgb(244, 114, 182)',
                    dark: 'rgb(219, 39, 119)',
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}
