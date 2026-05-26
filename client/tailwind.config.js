export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C1422',
        ink2: '#15203A',
        ink3: '#1E2C4A',
        paper: '#ECE4D2',
        paper2: '#D8CFB6',
        gold: '#C68E4F',
        goldBright: '#E0AD6B',
        ember: '#8B3A3A'
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Times New Roman', 'serif'],
        sans: ['Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        candle: '0 28px 80px rgba(0, 0, 0, 0.28)'
      }
    }
  },
  plugins: []
};
