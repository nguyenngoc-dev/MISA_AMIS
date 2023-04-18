import { createRouter, createWebHistory } from "vue-router";
import EmpoyeeList from "../views/employee/EmployeeList.vue";
import CategoryList from "../views/category/CategoryList.vue";
import OrderList from "../views/order/OrderList.vue";
import UserList from "../views/user/UserList.vue";


const routes = [
  { path: "/product", component: EmpoyeeList },
  { path: "/category", component: CategoryList },
  { path: "/manage-order", component: OrderList },
  { path: "/user", component: UserList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;