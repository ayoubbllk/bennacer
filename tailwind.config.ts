import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Stand-up Comedy
        scene: {
          black: '#0a0a0a',
          anthracite: '#1a1a1a',
          charcoal: '#2d2d2d',
          gray: '#3d3d3d',
        },
        cream: {
          DEFAULT: '#f5f5f0',
          soft: '#e8e8e3',
          warm: '#faf8f5',
        },
        spotlight: {
          orange: '#ff6b35',
          amber: '#ffaa00',
          gold: '#ffd700',
          warm: '#ff8c42',
        },
        stage: {
          red: '#8b0000',
          curtain: '#4a0404',
          wood: '#3d2914',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'spotlight-gradient': 'radial-gradient(ellipse at center top, rgba(255, 107, 53, 0.3) 0%, transparent 50%)',
        'stage-gradient': 'linear-gradient(to bottom, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'spotlight-pulse': 'spotlight 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'curtain-sway': 'curtainSway 8s ease-in-out infinite',
        'mic-bounce': 'micBounce 2s ease-in-out infinite',
      },
      keyframes: {
        spotlight: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.5))' },
          '100%': { filter: 'drop-shadow(0 0 40px rgba(255, 170, 0, 0.8))' },
        },
        curtainSway: {
          '0%, 100%': { transform: 'skewX(-1deg)' },
          '50%': { transform: 'skewX(1deg)' },
        },
        micBounce: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
      },
      boxShadow: {
        'spotlight': '0 0 60px 30px rgba(255, 107, 53, 0.3)',
        'glow-orange': '0 0 30px rgba(255, 107, 53, 0.5)',
        'glow-gold': '0 0 30px rgba(255, 215, 0, 0.5)',
        'stage': 'inset 0 -100px 100px -100px rgba(255, 107, 53, 0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
