import plugin from "tailwindcss/plugin";


export default plugin(function ({ addComponents }) {
  addComponents({
    ".flex-center": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
});