import axios from "axios";

const api = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:8080/api"
      : "http://localhost:8080/api",
});

export default api;