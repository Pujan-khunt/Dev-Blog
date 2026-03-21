import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import astroExpressiveCode from "astro-expressive-code";

export default defineConfig({
  site: "https://pujankhunt.me",
  integrations: [astroExpressiveCode({
    themes: ["github-dark", "github-light"],
    useDarkModeMediaQuery: false,
    themeCssSelector: (theme) => theme.type === "dark" ? ".dark" : ":root:not(.dark)",
    useThemedScrollbars: false,
    useThemedSelectionColors: false,
    emitExternalStylesheet: false,
    defaultProps: {
      showLineNumbers: true,
      wrap: false,
    },
  })],
  build: {
    inlineStylesheets: "always"
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
