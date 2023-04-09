import { createRouter, createWebHistory } from "vue-router";
import EmpoyeeList from "../views/employee/EmployeeList.vue";
import CashList from "../views/cash/CashList.vue";
import SaveMoney from "../views/save/SaveMoney.vue";
import PurchaseList from "../views/purchases/PurchaseList.vue";


const routes = [
  { path: "/product", component: EmpoyeeList },
  { path: "/category", component: CashList },
  { path: "/purchases", component: PurchaseList },
  { path: "/sell", component: PurchaseList },
  { path: "/manage-order", component: PurchaseList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;