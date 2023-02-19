
import axios from "axios";

export const HTTP = axios.create({
  baseURL: "https://localhost:44387/api/v1/Employees",
});

export const HTTPDepartments = axios.create({
  baseURL: "https://localhost:44387/api/v1/Departments",
});

