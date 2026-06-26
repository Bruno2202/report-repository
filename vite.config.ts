import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig({
  server: {
    host: true,
    port: 3000,

    https: {
      key: fs.readFileSync("./certs/172.20.80.35-key.pem"),
      cert: fs.readFileSync("./certs/172.20.80.35.pem"),
    },
  },

  build: {
    sourcemap: true,
  },

  plugins: [react(), tailwindcss()],
});
