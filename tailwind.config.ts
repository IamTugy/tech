import type { Config } from "tailwindcss";
import components from "./tailwind-components.js";

export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  mode: "jit",
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid': `
          linear-gradient(to right, rgb(203 213 225) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(203 213 225) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '8rem 10rem',
      },
    },
  },
  plugins: [
    components,
  ],
} satisfies Config;