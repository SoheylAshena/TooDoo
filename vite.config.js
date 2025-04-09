import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "icons/favicon.ico",
        "icons/apple-touch-icon.png",
        "icons/empty-tasks.svg",
      ],
      manifest: {
        name: "TooDoo | Task manager and to-do list",
        short_name: "TooDoo",
        description: "An advanced task manager web app",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#432dd7",
        background_color: "#432dd7",
        orientation: "portrait",
        icons: [
          {
            src: "icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
