/// <reference types="vitest" />

import { defineConfig, loadEnv } from "vite";
import UnoCSS from "unocss/vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import tsChecker from "vite-plugin-checker";
import devTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite";
import viteCompression from "vite-plugin-compression";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { babel } from "@rollup/plugin-babel";
import PostCssPresetEnv from "postcss-preset-env";
import autoprefixer from "autoprefixer";

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
        // perFile: true,
        // lines: 75,
        // functions: 75,
        // branches: 75,
        // statements: 75,
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
      cssTarget: "chrome90",
      target: "es2015",
      rollupOptions: {
        plugins: [
          babel({
            babelHelpers: "bundled",
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  corejs: "3",
                  targets: "last 2 versions and not dead, > 0.2%, Firefox ESR",
                },
              ],
            ],
            plugins: [],
            compact: false,
          }),
        ],
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
    css: {
      preprocessorOptions: {
        css: { charset: false },
      },
      postcss: {
        plugins: [
          PostCssPresetEnv(),
          autoprefixer({
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 90",
              "ff > 31",
              "ie >= 8",
            ],
          }),
        ],
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
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },
        resolvers: [ElementPlusResolver()],
        defaultExportByFilename: false,
        dts: true,
        vueTemplate: false,
        injectAtEnd: true,
      }),
      viteCompression(),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  });
};
