const plugin = require('tailwindcss/plugin')

module.exports = {
  important: true,
  // purge: {
  //   enabled: true,
    content: [
      './axios-connect/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './pages/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './components/**/**/*.{js,ts,jsx,tsx}',
      './components/**/**/**/*.{js,ts,jsx,tsx}',
    ],
  // },
  theme: {
    placeholderColor: (theme) => ({
      ...theme('colors'),
      dashboardFormInput: '#9fb3c8',
    }),
    textColor: (theme) => ({
      ...theme('colors'),
      dashboardFormInputLabel: '#829ab1',
    }),
    backgroundColor: (theme) => ({
      ...theme('colors'),
      dashboardFormInputBg: '#f0f4f8',
    }),
    extend: {
      padding: {
        sm: '25%',
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        secondaryLight: 'var(--secondaryLight)',
        third: 'var(--third)',
        fourth: 'var(--fourth)',
        fifth: 'var(--fifth)',
        sixth: 'var(--sixth)',
        sHover: 'var(--sHover)',
        sHover2: 'var(--sHover2)',
        pinkTransparent: 'var(--pinkTransparent)',
        bgLight: 'var(--bgLight)',
        relPink: 'var(--relPink)',
        relGreen: 'var(--relGreen)',
        cardArticleBg: 'var(--cardArticleBg)',
        borderOne: 'var(--borderOne)',
        borderTwo: 'var(--borderTwo)',
        sidebar: 'var(--sidebar)',
        codeBg: 'var(--codeBg)',
        placeholder: 'var(--placeholder)',
        customInput: 'var(--customInput)',
        lightSec: 'var(--lightSec)',
        'blue-450': '#3388FF',
      },
      backgroundImage: {
        gradient: 'var(--gradient)',
        gradientHover: 'var(--gradientHover)',
        gradient2: 'var(--gradient2)',
        gradient3: 'var(--gradient3)',
      },
      backgroundSize: {
        '50%': '50%',
        '75%': '75%',
        '120%': '120%',
        '150%': '150%',
      },
      backgroundPosition: {
        '60%': '60%',
      },
      borderRadius: {
        default: '32px',
      },
      fontSize: {
        body: '16px',
        h1: [
          '3.5rem',
          {
            lineHeight: '3.5rem',
          },
        ],
        h2: [
          '3rem',
          {
            lineHeight: '3rem',
          },
        ],
        h3: [
          '2rem',
          {
            lineHeight: '2rem',
          },
        ],
        h4: [
          '1.5rem',
          {
            lineHeight: '1.5rem',
          },
        ],
        h5: [
          '1.125rem',
          {
            lineHeight: '1.125rem',
          },
        ],
        par: [
          '1.125rem',
          {
            lineHeight: '1.5rem',
          },
        ],
        'par-s': ['1rem', { lineHeight: '1.625rem' }],
      },
      height: {
        worldMap: '63.75rem',
        worldMapBig: '85rem',
      },
      width: {
        hero: '60.5rem',
      },
      maxWidth: {
        heroMax: '60.5rem',
        loginRightContent: 'calc((1128px / 2) + 1.25rem)',
      },
      minHeight: {
        login: 'calc(100vh - 48px)',
      },
      zIndex: {
        5: '5',
      },
      letterSpacing: {
        tightS: '-0.5px',
      },
      borderColor: {
        gradient: 'linear-gradient(92.55deg, #E70077 3.08%, #FC8F0C 97.48%)',
      },
      boxShadow: {
        primaryButton: '0px 20px 40px rgba(254, 44, 61, 0.15)',
        platformCardIconPink: '0px 40px 100px 0px rgba(255, 204, 208, 0.8)',
        platformCardIconGreen: '0px 20px 100px 0px rgba(212, 247, 223, 0.5)',
        'dropdown-shadow': '0px 1px 10px 0px rgba(102, 111, 153, .2)',
      },
      fill: {
        socialIconHover: '#FF9199',
      },
      margin: {
        '1/4': '20%',
        '-1/4': '-20%',
      },
      backdropBlur: {
        cardBLur: 'var(--cardBLur)',
      },
      lineClamp: {
        7: '7',
        8: '8',
      },
      screens: {
        'r-min-3xl': { min: '1600px' },
        'r-min-2xl': { min: '1440px' },
        'r-min-lg': { min: '1140px' },
        'r-max-xl': { max: '1279px' },
        'r-max-lg': { max: '1023px' },
        'r-max-md': { max: '767px' },
        'r-max-sm': { max: '639px' },
      },
      gridTemplateColumns: {
        'two-one': '2fr 1fr',
        'one-two': '1fr 2fr',
        'two-onehalf': '2fr 1.5fr',
        'onehalf-two': '1.5fr 2fr',
        'home-two-small-box': 'repeat(2, 17.35rem)',
      },
    },
    fontFamily: {
      body: ['Sofia Pro'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-pseudo-elements'),
    require('@tailwindcss/typography'),
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.active-nav': {
          content: "''",
        },
      }
      addUtilities(newUtilities, {
        variants: ['before', 'after'],
      })
    }),
  ],
}
