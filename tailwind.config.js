/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "card-author-foreground": "var(--gray-light)",
        "card-title-foreground": "var(--blue-dark)",
        "card-description-foreground": "var(--gray-light)",
      },
    },
  },
  plugins: [],
};
