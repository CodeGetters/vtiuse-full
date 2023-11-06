/// <reference types="vitest" />

import { defineConfig, loadEnv } from "vite";
import UnoCSS from "unocss/vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import tsChecker from "vite-plugin-checker";
import devTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const VITE_BASE_URL = loadEnv(mode, process.cwd()).VITE_BASE_URL;

  return defineConfig({
    base: "/",
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    test: {
      environment: "happy-dom",
      coverage: {
        provider: "istanbul",
        reporter: ["text", "json", "html"],
        reportsDirectory: "./coverage",
        perFile: true,
        lines: 75,
        functions: 75,
        branches: 75,
        statements: 75,
      },
      open: true,
      include: ["src/test/*.test.ts"],
      globals: true,
    },
    server: {
      proxy: {
        "/api/": {
          target: VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "assets/js/[name].js",
          chunkFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash]-.[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
    plugins: [
      vue(),
      tsChecker({
        typescript: true,
      }),
      UnoCSS(),
      devTools(),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        imports: [
          "vue",
          "vue-router",
          {
            "@vueuse/core": [
              "useMouse", // import { useMouse } from '@vueuse/core',
            ],
            axios: [
              ["default", "axios"], // import { default as axios } from 'axios',
            ],
          },
        ],
        defaultExportByFilename: false,
        dts: true,
        vueTemplate: false,
        injectAtEnd: true,
      }),
      viteCompression(),
    ],
  });
};
