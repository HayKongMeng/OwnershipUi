/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/flowbite/**/*.js',
    
  ],
  theme: {
    extend: {
      screens: { 
        // 'md': { 'max': '768px' },
        'sm' : { 'max' : '640px'}
    },
      fontFamily:{
        popin: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin')
  ]
}