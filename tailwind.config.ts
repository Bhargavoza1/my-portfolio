/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

// "Lab notebook" design (Nov 2026): warm paper, near-black ink, thin rules, a teal
// accent for links, a red for limits. Fonts: IBM Plex Sans + IBM Plex Mono.
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      gray: colors.stone,
      paper: '#f6f6f1',
      card: '#ffffff',
      ink: '#16181d',
      muted: '#5f636b',
      faint: '#8a8e95',
      rule: '#dcdcd4',
      grid: '#e9e9e2',
      accent: '#0e7a8a',
      limit: '#b4232a',
      live: '#1aa36f',
      screen: '#1b1e24',
    },
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        page: '1200px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: ({ theme }: { theme: (p: string) => string }) => ({
        notebook: {
          css: {
            '--tw-prose-body': theme('colors.ink'),
            '--tw-prose-headings': theme('colors.ink'),
            '--tw-prose-links': theme('colors.accent'),
            '--tw-prose-bold': theme('colors.ink'),
            '--tw-prose-counters': theme('colors.faint'),
            '--tw-prose-bullets': theme('colors.faint'),
            '--tw-prose-hr': theme('colors.rule'),
            '--tw-prose-quotes': theme('colors.ink'),
            '--tw-prose-quote-borders': theme('colors.rule'),
            '--tw-prose-captions': theme('colors.muted'),
            '--tw-prose-code': theme('colors.ink'),
            // code blocks: dark text on a white box (the plugin default is light text
            // for a dark box, which made un-highlighted code invisible)
            '--tw-prose-pre-code': theme('colors.ink'),
            '--tw-prose-pre-bg': theme('colors.card'),
            '--tw-prose-th-borders': theme('colors.rule'),
            '--tw-prose-td-borders': theme('colors.rule'),
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),],
}
