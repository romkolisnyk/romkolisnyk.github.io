import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import ViteSvgSpriteWrapper from "vite-svg-sprite-wrapper";

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      template: "./src/index.html",
    }),
    ViteSvgSpriteWrapper({
      icons: "./src/assets/icons/*.svg",
      outputDir: "docs/assets",
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  build: {
    outDir: "docs",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  server: {
    open: true,
  },
});
