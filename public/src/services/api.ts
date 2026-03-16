import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    const authStorage = localStorage.getItem("@SuanyCakes:token");

    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage);
        const token = parsed.state?.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Erro ao parsear o auth-storage:", error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
