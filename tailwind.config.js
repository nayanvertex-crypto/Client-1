/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: 'oklch(0.985 0.002 240)',
          dark: 'oklch(0.120 0.010 240)'
        },
        surface: {
          light: 'oklch(0.950 0.005 240)',
          dark: 'oklch(0.200 0.015 240)'
        },
        accent: {
          DEFAULT: 'oklch(0.550 0.220 260)',
          hover: 'oklch(0.480 0.220 260)'
        }
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)'
      }
    }
  },
  plugins: []
};
