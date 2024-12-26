// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1: '#143F70',
        primary2: '#2CBDEB',
        primary3: '#2D90C4',
        primary4: '#1C78AA',
        primary5: '#E3E9ED',
       
      },
      backgroundImage: {
        'gradient-home': 'linear-gradient(135deg, #143F70, #2CBDEB, #2D90C4, #1C78AA)',
      },
      animation: {
        'move-title': 'moveTitle 2s ease-in-out infinite',
      },
      keyframes: {
        moveTitle: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
