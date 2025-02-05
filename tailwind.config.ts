import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00107A',
        onPrimary: '#FFFFFF',
        black: '#222222',
        progress: '#73C0E1',
        unPaid: '#DA0808',
        lightGrey: '#EEEEEE',
        greyBackLight: '#f7f7f7',
        greyBorder: '#C3C3C3',
        Inactive: '#848484',
        backGroundGrey: '#F0F0F0',
        splash: '#6ECEC0',
        fromGradient: '#4B5DD8',
        throughGradient: '#0017AD',
        toGreenCard: '#009A46',
        fromGreenCard: '#003418',
        toOrangeCard: '#DF9318',
        fromOrangeCard: '#AF7619',
        fromGreetGradient: '#7281E2',
        throughGreet: '#5D6BC7',
        approved: '#13970D'
      },

      backgroundImage: {
        'backImage': "url('/bgImage.png')"
      }
    },
  },
  plugins: [],
} satisfies Config;
