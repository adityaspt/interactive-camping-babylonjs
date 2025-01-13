import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/interactive-camping-babylonjs/" : "/",
  assetsInclude: [
    "**/*.jpg",
    "**/*.png",
    "**/*.jpeg",
    "**/*.gif",
    "**/*.svg",
    "**/*.tga",
    "**/*.hdr",
  ],
});
