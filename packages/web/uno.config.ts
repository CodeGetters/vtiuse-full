import {
  defineConfig,
  presetUno,
  presetIcons,
  presetAttributify,
  presetTypography,
} from "unocss";

export default defineConfig({
  rules: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      cdn: "https://esm.sh/",
      extraProperties: {
        display: "inline-block",
        height: "1.2em",
        width: "1.2em",
        "vertical-align": "text-bottom",
      },
    }),
  ],
});
