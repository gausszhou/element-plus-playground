import { createRouter, createWebHashHistory } from "vue-router";
import FormDisabled from "@/views/form-disabled.vue";
import FormDisabledFormEnable from "@/views/form-disabled-form-enable.vue";
import TableCustomColumn from "@/views/table-custom-column.vue";

const routes = [
  { path: "/", component: FormDisabled },
  { path: "/form-disabled", component: FormDisabled },
  { path: "/form-disabled-form-enable", component: FormDisabledFormEnable },
  { path: "/table-custom-column", component: TableCustomColumn },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
