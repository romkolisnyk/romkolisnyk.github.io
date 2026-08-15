import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';

export default defineConfig({
  base: './',
  plugins: [
    createHtmlPlugin({
      minify: true,
      template: './src/index.html',
    }),
    VitePluginSvgSpritemap('./src/assets/icons/*.svg', {
      prefix: '',
      route: '/assets/sprite.svg',
      output: {
        name: 'sprite.svg',
        view: false,
        use: true,
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  server: {
    open: '/src/',
  },
});
