/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heebo:    ['var(--font-heebo)'],
        playfair: ['var(--font-playfair)'],
        mono:     ['var(--font-mono)'],
      },
      borderRadius: {
        lg: 'var(--rlg)',
        md: 'var(--r)',
        sm: 'calc(var(--r) - 2px)',
      },
      colors: {
        bg:       'var(--bg)',
        surface:  'var(--surface)',
        surface2: 'var(--surface2)',
        surface3: 'var(--surface3)',
        paper:    'var(--paper)',
        paper2:   'var(--paper2)',

        text:     'var(--text)',
        text2:    'var(--text2)',
        text3:    'var(--text3)',

        purple:   'var(--purple)',
        teal:     'var(--teal)',
        amber:    'var(--amber)',
        coral:    'var(--coral)',

        background: 'var(--bg)',
        foreground: 'var(--text)',
        card: {
          DEFAULT:    'var(--surface)',
          foreground: 'var(--text)',
        },
        popover: {
          DEFAULT:    'var(--surface)',
          foreground: 'var(--text)',
        },
        primary: {
          DEFAULT:    'var(--amber)',
          foreground: 'var(--bg)',
        },
        secondary: {
          DEFAULT:    'var(--surface2)',
          foreground: 'var(--text2)',
        },
        muted: {
          DEFAULT:    'var(--surface3)',
          foreground: 'var(--text2)',
        },
        accent: {
          DEFAULT:    'var(--amber)',
          foreground: 'var(--bg)',
        },
        destructive: {
          DEFAULT:    'var(--coral)',
          foreground: 'var(--paper)',
        },
        border:  'var(--border)',
        input:   'var(--surface2)',
        ring:    'var(--amber)',
        sidebar: {
          DEFAULT:              'var(--surface)',
          foreground:           'var(--text2)',
          primary:              'var(--amber)',
          'primary-foreground': 'var(--bg)',
          accent:               'var(--surface2)',
          'accent-foreground':  'var(--text)',
          border:               'var(--border)',
          ring:                 'var(--amber)',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'fade-up':        'fadeUp 0.35s ease both',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};