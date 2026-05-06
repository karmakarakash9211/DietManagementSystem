import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json"
  }
});

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN SENT:", token);
  // 🚨 Do NOT attach token for auth APIs
  if (token && !req.url.includes("/auth")) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;