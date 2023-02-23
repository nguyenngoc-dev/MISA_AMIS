import { createRouter, createWebHistory } from "vue-router";
import EmpoyeeList from "../views/employee/EmployeeList.vue";
import CashList from "../views/cash/CashList.vue";
import SaveMoney from "../views/save/SaveMoney.vue";
import PurchaseList from "../views/purchases/PurchaseList.vue";


const routes = [
  { path: "/employee", component: EmpoyeeList },
  { path: "/cash", component: CashList },
  { path: "/save-money", component: SaveMoney },
  { path: "/purchases", component: PurchaseList },
  { path: "/sell", component: PurchaseList },
  { path: "/manage-order", component: PurchaseList },
  { path: "/store", component: PurchaseList },
  { path: "/tool", component: PurchaseList },
  { path: "/assets", component: PurchaseList },
  { path: "/tax", component: PurchaseList },
  { path: "/price", component: PurchaseList },
  { path: "/sumary", component: PurchaseList },
  { path: "/budget", component: PurchaseList },
  { path: "/report", component: PurchaseList },
  { path: "/financial-analysis", component: PurchaseList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;