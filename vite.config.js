import { defineConfig } from "vite";

export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "/interactive-camping-babylonjs/"
      : "/",
  assetsInclude: [
    "**/*.jpg",
    "**/*.png",
    "**/*.jpeg",
    "**/*.gif",
    "**/*.svg",
    "**/*.tga",
    "**/*.hdr",
  ],
  build: {
    target: "esnext", // Ensure top-level await support
  },
  server: {
    https: {
      key: "./key.pem", 
      cert: "./cert.pem", 
    },
    host: "0.0.0.0", // Allow access from other devices (like Quest 2)
    port: 3000, // Replace with your preferred port
  },
});
