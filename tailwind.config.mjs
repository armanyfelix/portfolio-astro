/** @type {import('tailwindcss').Config} */
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        mohave: ['var(--font-mohave)'],
        // ysabeau: ['var(--font-ysabeau)'],
      },
      animation: {
        'fade-out': 'fade-out 0.5s forwards',
        'fade-in': 'fade-in 0.5s forwards',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        'fade-out': {
          to: { display: 'none', opacity: 0 },
        },
        'fade-in': {
          to: { display: 'block', opacity: 100 },
        },
        spotlight: {
          '0%': {
            opacity: 0,
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    addVariablesForColors,
  ],
  daisyui: {
    themes: [
      // {
      //   dark: {
      //     ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
      //     secondary: '#525FE1',
      //     'text-neutral': '#ffffff',
      //   },
      // },
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      {
        mytheme: {
          primary: '#f34213',
          secondary: '#525FE1',
          accent: '#fce4de',
          neutral: '#e0fbfc',
          'base-100': '#000000',
          info: '#81a4cd',
          success: '#5c8001',
          warning: '#ffbe0b',
          error: '#af1b3f',
          '--rounded-box': '2rem',
          '--rounded-btn': '4.5rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '0.25s',
          '--animation-input': '0.2s',
          '--btn-text-case': 'uppercase',
          '--btn-focus-scale': '0.95',
          '--border-btn': '1px',
          '--tab-border': '1px',
          '--tab-radius': '0.5rem',
        },
      },
    ],
    // darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars,
  })
}
