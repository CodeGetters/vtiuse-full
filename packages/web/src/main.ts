import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import "virtual:uno.css";
import "core-js/stable";
import "regenerator-runtime/runtime";

const app = createApp(App);
app.use(router);
app.mount("#app");
