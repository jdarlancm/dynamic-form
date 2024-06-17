import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-blue-500",
    "bg-blue-600",
    "text-blue-500",
    "bg-green-500",
    "bg-green-600",
    "text-white",
    {
      pattern: /(bg|text|border)-gray-(100|200|300|400|500|600|700|800|900)/,
      variants: ["", "hover", "dark", "dark:hover"],
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#60a5fa",
          DEFAULT: "#3B82F6",
          dark: "#3066C4",
        },
        secondary: "#10B981",
        accent: "#F59E0B",
        background: {
          DEFAULT: "#E5E7EB",
          dark: "#1F2937",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};
export default config;
