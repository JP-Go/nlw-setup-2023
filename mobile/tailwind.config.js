/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,ts,jsx,tsx}", "src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090A",
      },
      fontFamily: {
        regular: "Inter_400Regular",
        semibold: "Inter_600SemiBold",
        bold: "Inter_700Bold",
        extrabold: "Inter_800ExtraBold",
      },
    },
  },
  plugins: [],
};
