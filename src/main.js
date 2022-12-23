import "./assets/css/reset.css";
import "vue-toastification/dist/index.css";
import { GDialog } from 'gitart-vue-dialog';
import 'gitart-vue-dialog/dist/style.css';

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Toast from "vue-toastification";

import App from "./App.vue";
import DashboardPage from "./pages/DashboardPage.vue";
import ChoosePropertyPage from "./pages/ChoosePropertyPage.vue";
import LiveDataPage from "./pages/LiveDataPage.vue";
import ManagePropertyPage from "./pages/ManagePropertyPage.vue";
import AddUserPage from "./pages/AddUserPage.vue";
import AddPropertyPage from "./pages/AddPropertyPage.vue";
import PricingPage from "./pages/PricingPage.vue";
import ProfilePage from "./pages/ProfilePage.vue";
import StatisticsPage from "./pages/StatisticsPage.vue";
import MapPage from "./pages/MapPage.vue";
import AdminManageUsers from "./pages/AdminManageUsers.vue";
import AdminManageProperties from "./pages/AdminManageProperties.vue";
import AdminManageDrones from "./pages/AdminManageDrones.vue";
import AdminManagePendingProperties from "@/pages/AdminManagePendingProperties.vue";
import AdminManageRemovalProperties from "@/pages/AdminManageRemovalProperties.vue";

const routes = [
  { path: "/", component: DashboardPage },
  { path: "/choose-property", component: ChoosePropertyPage },
  { path: "/live-data", component: LiveDataPage },
  { path: "/live-data/:id", component: LiveDataPage },
  { path: "/manage-property", component: ManagePropertyPage },
  { path: "/manage-property/:id", component: ManagePropertyPage },
  { path: "/add-user", component: AddUserPage },
  { path: "/add-user/:id", component: AddUserPage },
  { path: "/add-property", component: AddPropertyPage },
  { path: "/pricing", component: PricingPage },
  { path: "/profile", component: ProfilePage },
  { path: "/map-page", component: MapPage },
  { path: "/statistics", component: StatisticsPage },
  { path: "/admin", redirect: "/admin/users" }, // Temporary redirect
  { path: "/admin/drones", component: AdminManageDrones },
  {
    name: "AdminManagePendingProperties",
    path: "/admin/properties/pending",
    component: AdminManagePendingProperties,
  },
  {
    name: "AdminManagePendingPropertiesParams",
    path: "/admin/properties/pending/:id",
    component: AdminManagePendingProperties,
  },
  { path: "/admin/properties/remove", component: AdminManageRemovalProperties },
  {
    name: "AdminManageUsers",
    path: "/admin/users",
    component: AdminManageUsers,
  },
  {
    name: "AdminManageUsersParams",
    path: "/admin/users/:id",
    component: AdminManageUsers,
  },
  {
    name: "AdminManageProperties",
    path: "/admin/properties",
    component: AdminManageProperties,
  },
  {
    name: "AdminManagePropertiesParams",
    path: "/admin/properties/:id",
    component: AdminManageProperties,
  },
];

const router = createRouter({
  // Set history as /mars-06/ if its production but as / if its development
  history: createWebHistory(
    process.env.NODE_ENV === "production" ? "/mars-06/" : "/"
  ),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});
app.component('GDialog', GDialog);
