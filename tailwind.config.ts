import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        moa: {
          50: "#e8f4fd",
          100: "#c5e4fa",
          200: "#9dd1f6",
          300: "#6ebcf1",
          400: "#3da8eb",
          500: "#0c93e6",
          600: "#0a7bc2",
          700: "#08629b",
          800: "#064a75",
          900: "#04324f",
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
