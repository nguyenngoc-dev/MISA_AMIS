
import axios from "axios";

export const HTTP = axios.create({
  baseURL: "https://localhost:44314/api/v1/Products",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
});

export const HTTPCategorys = axios.create({
  baseURL: "https://localhost:44314/api/v1/Categorys",
});
export const HTTPProductImages = axios.create({
  baseURL: "https://localhost:44314/api/v1/ProductImages",
});
export const HTTPOrders = axios.create({
  baseURL: "https://localhost:44314/api/v1/SaleOrders",
});
export const HTTPUsers = axios.create({
  baseURL: "https://localhost:44314/api/v1/Users",
});
export const HTTPOrderItem = axios.create({
  baseURL: "https://localhost:44314/api/v1/OrderItems",
});
