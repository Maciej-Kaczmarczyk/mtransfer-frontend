import axios from "axios";
import Cookies from "js-cookie";

/**
 * Tworzy instancję Axios z domyślną konfiguracją
 * - baseURL: Pobierana z zmiennej środowiskowej VITE_API_URL
 * - headers: Ustawia Content-Type na application/json
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
