// vite.config.ts
import { defineConfig, loadEnv } from "file:///Volumes/ti5000_1t/code_store/vtiuse-full/node_modules/.pnpm/vite@5.1.6_@types+node@20.17.14_sass@1.72.0_terser@5.29.2/node_modules/vite/dist/node/index.js";
import UnoCSS from "file:///Volumes/ti5000_1t/code_store/vtiuse-full/node_modules/.pnpm/unocss@0.58.6_postcss@8.4.35_rollup@4.13.0_vite@5.1.6_@types+node@20.17.14_sass@1.72.0_terser@5.29.2_/node_modules/unocss/dist/vite.mjs";
import vue from "file:///Volumes/ti5000_1t/code_store/vtiuse-full/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.6_@types+node@20.17.14_sass@1.72.0_terser@5.29.2__vue@3.4.21_typescript@5.7.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "node:path";
import tsChecker from "file:///Volumes/ti5000_1t/code_store/vtiuse-full/node_modules/.pnpm/vite-plugin-checker@0.6.4_eslint@9.18.0_jiti@2.4.2__optionator@0.9.4_typescript@5.7.3_vite@5._zucsjojhy3uvn5jarit5cb4sxi/node_modules/vite-plugin-checker/dist/esm/main.js";
import devTools from "file:///Volumes/ti5000_1t/code_store/vtiuse-full/node_modules/.pnpm/vite-plugin-vue-devtools@7.0.17_rollup@4.13.0_vite@5.1.6_@types+node@20.17.14_sass@1.72.0_ter_bxmj7dvzb2eagcjenitr3guoam/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import AutoImport from "file:///Volumes/ti5000_1t/code_store/vtiuse-full/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.9.0_vue@3.4.21_typescript@5.7.3___rollup@4.13.0/node_modules/unplugin-auto-import/dist/vite.js";
import viteCompression from "file:///Volumes/ti5000_1t/code_store/vtiuse-full/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.1.6_@types+node@20.17.14_sass@1.72.0_terser@5.29.2_/node_modules/vite-plugin-compression/dist/index.mjs";
import { ElementPlusResolver } from "file:///Volumes/ti5000_1t/code_store/vtiuse-full/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.24.0_rollup@4.13.0_vue@3.4.21_typescript@5.7.3_/node_modules/unplugin-vue-components/dist/resolvers.js";
import Components from "file:///Volumes/ti5000_1t/code_store/vtiuse-full/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.24.0_rollup@4.13.0_vue@3.4.21_typescript@5.7.3_/node_modules/unplugin-vue-components/dist/vite.js";
import { babel } from "file:///Volumes/ti5000_1t/code_store/vtiuse-full/node_modules/.pnpm/@rollup+plugin-babel@6.0.4_@babel+core@7.24.0_@types+babel__core@7.20.5_rollup@4.13.0/node_modules/@rollup/plugin-babel/dist/es/index.js";
import PostCssPresetEnv from "file:///Volumes/ti5000_1t/code_store/vtiuse-full/node_modules/.pnpm/postcss-preset-env@9.5.1_postcss@8.4.35/node_modules/postcss-preset-env/dist/index.mjs";
import autoprefixer from "file:///Volumes/ti5000_1t/code_store/vtiuse-full/node_modules/.pnpm/autoprefixer@10.4.18_postcss@8.4.35/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "/Volumes/ti5000_1t/code_store/vtiuse-full/apps/web";
var vite_config_default = ({ mode }) => {
  const VITE_BASE_URL = loadEnv(mode, process.cwd()).VITE_BASE_URL;
  return defineConfig({
    base: "/",
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src")
      }
    },
    test: {
      environment: "happy-dom",
      coverage: {
        provider: "istanbul",
        reporter: ["text", "json", "html"],
        reportsDirectory: "./coverage"
        // perFile: true,
        // lines: 75,
        // functions: 75,
        // branches: 75,
        // statements: 75,
      },
      open: true,
      include: ["src/test/*.test.ts"],
      globals: true
    },
    server: {
      proxy: {
        "/api/": {
          target: VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
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
                  targets: "last 2 versions and not dead, > 0.2%, Firefox ESR"
                }
              ]
            ],
            plugins: [],
            compact: false
          })
        ],
        output: {
          entryFileNames: "assets/js/[name].js",
          chunkFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash]-.[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        css: { charset: false }
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
              "ie >= 8"
            ]
          })
        ]
      }
    },
    plugins: [
      vue(),
      tsChecker({
        typescript: true
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
              "useMouse"
              // import { useMouse } from '@vueuse/core',
            ],
            axios: [
              ["default", "axios"]
              // import { default as axios } from 'axios',
            ]
          }
        ],
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true
        },
        resolvers: [ElementPlusResolver()],
        defaultExportByFilename: false,
        dts: true,
        vueTemplate: false,
        injectAtEnd: true
      }),
      viteCompression(),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVm9sdW1lcy90aTUwMDBfMXQvY29kZV9zdG9yZS92dGl1c2UtZnVsbC9hcHBzL3dlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1ZvbHVtZXMvdGk1MDAwXzF0L2NvZGVfc3RvcmUvdnRpdXNlLWZ1bGwvYXBwcy93ZWIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1ZvbHVtZXMvdGk1MDAwXzF0L2NvZGVfc3RvcmUvdnRpdXNlLWZ1bGwvYXBwcy93ZWIvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgVW5vQ1NTIGZyb20gXCJ1bm9jc3Mvdml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHRzQ2hlY2tlciBmcm9tIFwidml0ZS1wbHVnaW4tY2hlY2tlclwiO1xuaW1wb3J0IGRldlRvb2xzIGZyb20gXCJ2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHNcIjtcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XG5pbXBvcnQgeyBiYWJlbCB9IGZyb20gXCJAcm9sbHVwL3BsdWdpbi1iYWJlbFwiO1xuaW1wb3J0IFBvc3RDc3NQcmVzZXRFbnYgZnJvbSBcInBvc3Rjc3MtcHJlc2V0LWVudlwiO1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tIFwiYXV0b3ByZWZpeGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBWSVRFX0JBU0VfVVJMID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKS5WSVRFX0JBU0VfVVJMO1xuXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgIGJhc2U6IFwiL1wiLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiksXG4gICAgICB9LFxuICAgIH0sXG4gICAgdGVzdDoge1xuICAgICAgZW52aXJvbm1lbnQ6IFwiaGFwcHktZG9tXCIsXG4gICAgICBjb3ZlcmFnZToge1xuICAgICAgICBwcm92aWRlcjogXCJpc3RhbmJ1bFwiLFxuICAgICAgICByZXBvcnRlcjogW1widGV4dFwiLCBcImpzb25cIiwgXCJodG1sXCJdLFxuICAgICAgICByZXBvcnRzRGlyZWN0b3J5OiBcIi4vY292ZXJhZ2VcIixcbiAgICAgICAgLy8gcGVyRmlsZTogdHJ1ZSxcbiAgICAgICAgLy8gbGluZXM6IDc1LFxuICAgICAgICAvLyBmdW5jdGlvbnM6IDc1LFxuICAgICAgICAvLyBicmFuY2hlczogNzUsXG4gICAgICAgIC8vIHN0YXRlbWVudHM6IDc1LFxuICAgICAgfSxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICBpbmNsdWRlOiBbXCJzcmMvdGVzdC8qLnRlc3QudHNcIl0sXG4gICAgICBnbG9iYWxzOiB0cnVlLFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwcm94eToge1xuICAgICAgICBcIi9hcGkvXCI6IHtcbiAgICAgICAgICB0YXJnZXQ6IFZJVEVfQkFTRV9VUkwsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgY3NzVGFyZ2V0OiBcImNocm9tZTkwXCIsXG4gICAgICB0YXJnZXQ6IFwiZXMyMDE1XCIsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICBiYWJlbCh7XG4gICAgICAgICAgICBiYWJlbEhlbHBlcnM6IFwiYnVuZGxlZFwiLFxuICAgICAgICAgICAgcHJlc2V0czogW1xuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgXCJAYmFiZWwvcHJlc2V0LWVudlwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHVzZUJ1aWx0SW5zOiBcImVudHJ5XCIsXG4gICAgICAgICAgICAgICAgICBjb3JlanM6IFwiM1wiLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0czogXCJsYXN0IDIgdmVyc2lvbnMgYW5kIG5vdCBkZWFkLCA+IDAuMiUsIEZpcmVmb3ggRVNSXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBwbHVnaW5zOiBbXSxcbiAgICAgICAgICAgIGNvbXBhY3Q6IGZhbHNlLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJhc3NldHMvanMvW25hbWVdLmpzXCIsXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwiYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogXCJhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS0uW2V4dF1cIixcbiAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gaWRcbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIm5vZGVfbW9kdWxlcy9cIilbMV1cbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIvXCIpWzBdXG4gICAgICAgICAgICAgICAgLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgY3NzOiB7IGNoYXJzZXQ6IGZhbHNlIH0sXG4gICAgICB9LFxuICAgICAgcG9zdGNzczoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgUG9zdENzc1ByZXNldEVudigpLFxuICAgICAgICAgIGF1dG9wcmVmaXhlcih7XG4gICAgICAgICAgICBvdmVycmlkZUJyb3dzZXJzbGlzdDogW1xuICAgICAgICAgICAgICBcIkFuZHJvaWQgNC4xXCIsXG4gICAgICAgICAgICAgIFwiaU9TIDcuMVwiLFxuICAgICAgICAgICAgICBcIkNocm9tZSA+IDkwXCIsXG4gICAgICAgICAgICAgIFwiZmYgPiAzMVwiLFxuICAgICAgICAgICAgICBcImllID49IDhcIixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICB0c0NoZWNrZXIoe1xuICAgICAgICB0eXBlc2NyaXB0OiB0cnVlLFxuICAgICAgfSksXG4gICAgICBVbm9DU1MoKSxcbiAgICAgIGRldlRvb2xzKCksXG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgaW5jbHVkZTogWy9cXC5bdGpdc3g/JC8sIC9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcbiAgICAgICAgaW1wb3J0czogW1xuICAgICAgICAgIFwidnVlXCIsXG4gICAgICAgICAgXCJ2dWUtcm91dGVyXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJAdnVldXNlL2NvcmVcIjogW1xuICAgICAgICAgICAgICBcInVzZU1vdXNlXCIsIC8vIGltcG9ydCB7IHVzZU1vdXNlIH0gZnJvbSAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBheGlvczogW1xuICAgICAgICAgICAgICBbXCJkZWZhdWx0XCIsIFwiYXhpb3NcIl0sIC8vIGltcG9ydCB7IGRlZmF1bHQgYXMgYXhpb3MgfSBmcm9tICdheGlvcycsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGVzbGludHJjOiB7XG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBmaWxlcGF0aDogXCIuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uXCIsXG4gICAgICAgICAgZ2xvYmFsc1Byb3BWYWx1ZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAgICAgZGVmYXVsdEV4cG9ydEJ5RmlsZW5hbWU6IGZhbHNlLFxuICAgICAgICBkdHM6IHRydWUsXG4gICAgICAgIHZ1ZVRlbXBsYXRlOiBmYWxzZSxcbiAgICAgICAgaW5qZWN0QXRFbmQ6IHRydWUsXG4gICAgICB9KSxcbiAgICAgIHZpdGVDb21wcmVzc2lvbigpLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcbn07XG4iXSwKICAi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
