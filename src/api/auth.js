import api from "./axios";
import Cookies from "js-cookie";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const accessToken = response.data.accessToken;
    if (accessToken) {
      Cookies.set("accessToken", accessToken, {
        expires: 1, // 1 dzień
        secure: true,
        sameSite: "strict",
      });
    }

    return response.data;
  } catch (error) {
    console.error("Błąd logowania:", error);
    throw error.response?.data || { message: "Błąd logowania" };
  }
};

export const register = async (email, password) => {
  try {
    const response = await api.post("/auth/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Błąd rejestracji:", error);
    throw error.response?.data || { message: "Błąd rejestracji" };
  }
};
