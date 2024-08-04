import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        p: ['var(--font-abel)'], // paragraph
        h: ['var(--font-italiana)'], // header
      },
      height: {
        '200': '200px',
        '240': '240px',
        '300': '300px',
        '360': '360px',
        '480': '480px',
        '540': '540px',
        '720': '720px',
        '1080': '1080px',
        '1200': '1200px',
        '1920': '1920px',
      },
      width: {
        '200': '200px',
        '240': '240px',
        '300': '300px',
        '360': '360px',
        '480': '480px',
        '540': '540px',
        '720': '720px',
        '1080': '1080px',
        '1200': '1200px',
        '1920': '1920px',
      },
      colors: {
        'anne-indigo-light': '#808D9A',
        'anne-indigo': '#314154',
        'anne-indigo-dark': '#292E38',
        'anne-indigo-medium': '#314154',
        'anne-gold': '#E5B35E',
      },
    },
  },
  plugins: [],
};
export default config;
