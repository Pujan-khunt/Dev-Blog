import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import astroExpressiveCode from "astro-expressive-code";

export default defineConfig({
  site: "https://pujankhunt.me",
  integrations: [astroExpressiveCode({
    themes: ["github-dark", "github-light"],
    useDarkModeMediaQuery: false,
    themeCssSelector: (theme) => theme.type === "dark" ? ".dark" : ":root:not(.dark)",
    // Prevents FOUC by inlining the stylesheets(CSS) onto HTML.
    emitExternalStylesheet: false,
    defaultProps: {
      showLineNumbers: false,
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
