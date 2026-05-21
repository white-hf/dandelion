import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        night: "#07100d",
        moss: "#314d3b",
        fern: "#5f7d5f",
        cream: "#f7f1e4",
        wheat: "#e7d6b1",
        porcelain: "#fff9ef",
        ember: "#c46a3b",
        copper: "#da824e",
        mint: "#9fd2af",
        slateblue: "#223349",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Avenir Next", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(23, 33, 27, 0.14)",
        premium: "0 30px 90px rgba(0, 0, 0, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
