import { VitePWA } from "vite-plugin-pwa"



export default {
    root: "src",
    publicDir: "../public",
    build: {
        outDir: "../dist"
    },
    plugins: [
        VitePWA({
            registerType: "autoUpdate"
        })
    ],
    workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,ogg}'],
      }
    }