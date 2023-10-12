import type { Config } from "tailwindcss";


const config: Config = {
  darkMode: 'class',
  content: [
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "lg-light":
          "0 10px 15px -3px hsla(0,0%,100%,.1),0 4px 6px -2px hsla(0,0%,100%,.05)",
      },
      
    },
  },
  plugins: [],
};
export default config;
