// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// public/manifest.json
var manifest_default = {
  name: "Electio-SN",
  short_name: "electio-sn",
  description: "Application de gestion d'\xE9lections pr\xE9sidentielles et de vote en ligne",
  theme_color: "#ffffff",
  icons: [
    {
      src: "./assets/pwa/pwa-192x192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "./assets/pwa/pwa-512x512.png",
      sizes: "512x512",
      type: "image/png"
    },
    {
      src: "./assets/pwa/pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable"
    }
  ]
};

// vite.config.js
import { VitePWA } from "vite-plugin-pwa";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: manifest_default,
      devOptions: {
        enabled: true
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBQkZcXFxcRGVza3RvcFxcXFxQcm9qZXQgU2VydmljZXMgV2ViXFxcXGVsZWN0aW8tc25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFCRlxcXFxEZXNrdG9wXFxcXFByb2pldCBTZXJ2aWNlcyBXZWJcXFxcZWxlY3Rpby1zblxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQUJGL0Rlc2t0b3AvUHJvamV0JTIwU2VydmljZXMlMjBXZWIvZWxlY3Rpby1zbi92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vcHVibGljL21hbmlmZXN0Lmpzb24nXHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBWaXRlUFdBKHtcclxuICAgICAgbWFuaWZlc3Q6IG1hbmlmZXN0LFxyXG4gICAgICBkZXZPcHRpb25zOiB7XHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIF1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVixTQUFTLG9CQUFvQjtBQUN4WCxPQUFPLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxCLFNBQVMsZUFBZTtBQUd4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixZQUFZO0FBQUEsUUFDVixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
