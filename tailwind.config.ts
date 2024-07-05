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
        '360': '360px',
        '480': '480px',
        '720': '720px',
        '1080': '1080px',
      },
      width: {
        '360': '360px',
        '480': '480px',
        '720': '720px',
        '1080': '1080px',
      },
      colors: {
        'indigo-custom': '#314154',
      },
    },
  },
  plugins: [],
};
export default config;
