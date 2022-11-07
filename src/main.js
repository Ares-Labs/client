import "./assets/css/reset.css";

import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import DashboardPage from "./pages/DashboardPage.vue";
import LiveDataPage from "./pages/LiveDataPage.vue";
import ManagePropertyPage from "./pages/ManagePropertyPage.vue";
import { createApp } from "vue";

const routes = [
  { path: "/", component: DashboardPage },
  { path: "/live-data", component: LiveDataPage },
  { path: "/manage-property", component: ManagePropertyPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
