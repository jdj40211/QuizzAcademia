/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#513DEB',
        'primary-light': '#6A58EE', 
        'primary-dark': '#4232C5',
        secondary: '#F5F5F7',
        'secondary-dark': '#E0E0E5',
        accent: '#FF6B6B',
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        background: '#FFFFFF',
        text: {
          primary: '#1A1A1A',
          secondary: '#6B7280',
          light: '#FFFFFF',
        },
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'button': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};