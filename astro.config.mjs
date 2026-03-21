import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import astroExpressiveCode from "astro-expressive-code";

export default defineConfig({
  site: "https://pujankhunt.me",
  integrations: [astroExpressiveCode({
    themes: ["github-dark", "github-light"],
    useDarkModeMediaQuery: false,
    themeCssSelector: (theme) => theme.type === "dark" ? ".dark" : ":root:not(.dark)",
    defaultProps: {
      showLineNumbers: true,
      wrap: false,
    },
    // styleOverrides: {
    //   borderRadius: "0",
    //   codeFontFamily: "JetBrains Mono, ui-monospace, monospace",
    //   codeFontSize: "0.8rem",
    //   borderColor: "var(--color-border)",
    // },
  })],
  vite: {
    plugins: [tailwindcss()],
  },
});
