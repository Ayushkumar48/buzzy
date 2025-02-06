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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "berry-red": "#b8255f",
        red: "#cf473a",
        orange: "#c77100",
        yellow: "#b29104",
        "olive-green": "#949c31",
        "lime-green": "#65a33a",
        green: "#369307",
        "mint-green": "#42a393",
        teal: "#148fad",
        "sky-blue": "#319dc0",
        "light-blue": "#6988a4",
        blue: "#2a67e2",
        grape: "#692ec2",
        violet: "#ac30cc",
        lavender: "#a4698c",
        magenta: "#e05095",
        salmon: "#b2635c",
        charcoal: "#808080",
        grey: "#999999",
        taupe: "#8f7a69",
      },
    },
  },
  plugins: [],
} satisfies Config;
