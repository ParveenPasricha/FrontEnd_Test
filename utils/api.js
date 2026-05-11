import axios from "axios";

const api = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:8080/api"
      : "https://project-test-backend.onrender.com/api",
});

export default api;