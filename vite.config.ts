// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";
import { VitePWA } from "vite-plugin-pwa";
// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",

  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss",
      },
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        // กำหนดค่าการตั้งค่าของ Service Worker ตามความต้องการ
        globPatterns: ["**/*.{js,css,html,png}"],
      },
      manifest: {
        // กำหนดค่า manifest ของ PWA ที่คุณต้องการ
        name: "BadBoyz",
        description: "my pwa",
        short_name: "BadBoyz",
        start_url: "./index.html",
        scope: "./index.html",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "./icon.ico",
            sizes: "128x128",
            type: "image/x-icon",
          },
        ],
      },
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
  },
});
