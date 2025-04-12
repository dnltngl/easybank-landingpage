/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "button-gradient":
          "linear-gradient(to right, var(--teal) 0%, var(--green) 100%)",
      },
      colors: {
        "menu-foreground": "var(--gray-light)",
        "card-author-foreground": "var(--gray-light)",
        "card-title-foreground": "var(--blue-dark)",
        "card-description-foreground": "var(--gray-light)",
      },
      screens: {
        xs: "500px", 
      },
    },
  },
  plugins: [],
};
