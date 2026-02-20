import api from "./api";
import type { IAuthResponse, ILoginRequest, IRegisterRequest, IUser } from "../types";

export const authService = {
  // Login user
  login: async (credentials: ILoginRequest): Promise<IAuthResponse> => {
    const response = await api.post<IAuthResponse>("/auth/login", credentials);
    return response.data;
  },

  // Register user
  register: async (userData: IRegisterRequest): Promise<IAuthResponse> => {
    const response = await api.post<IAuthResponse>("/auth/register", userData);
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<IUser> => {
    const response = await api.get<{ user: IUser }>("/auth/me");
    return response.data.user;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
