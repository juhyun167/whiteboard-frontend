import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import PrimeVue from "primevue/config";
import * as ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";

import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);

app.directive("tooltip", Tooltip);

app.use(ToastService).use(PrimeVue);
app.use(store).use(router).mount("#app");
