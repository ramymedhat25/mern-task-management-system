// src/api/index.js
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers["x-auth-token"] = localStorage.getItem("token");
  }
  return req;
});

export const fetchTasks = () => API.get("/tasks");
export const createTask = (task) => API.post("/tasks", task);
export const updateTask = (id, task) => API.put(`/tasks/${id}`, task);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const loginUser = (formData) => API.post("/auth/login", formData);
export const registerUser = (formData) => API.post("/auth/register", formData);
