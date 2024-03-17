import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import "virtual:uno.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { i18n } from "@/i18n/index";

const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount("#app");
