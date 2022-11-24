import "./assets/css/reset.css";

import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import DashboardPage from "./pages/DashboardPage.vue";
import ChoosePropertyPage from "./pages/ChoosePropertyPage.vue";
import LiveDataPage from "./pages/LiveDataPage.vue";
import ManagePropertyPage from "./pages/ManagePropertyPage.vue";
import AddUserPage from "./pages/AddUserPage.vue";
import AddPropertyPage from "./pages/AddPropertyPage.vue";
import { createApp } from "vue";
import PricingPage from "./pages/PricingPage.vue";
import ProfilePage from "./pages/ProfilePage.vue";

const routes = [
  { path: "/", component: DashboardPage },
  { path: "/choose-property", component: ChoosePropertyPage },
  { path: "/live-data", component: LiveDataPage },
  { path: "/manage-property", component: ManagePropertyPage },
  { path: "/manage-property/:id", component: ManagePropertyPage },
  { path: "/add-user", component: AddUserPage},
  { path: "/add-property", component: AddPropertyPage},
  { path: "/pricing", component: PricingPage},
  { path: "/profile", component: ProfilePage}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
