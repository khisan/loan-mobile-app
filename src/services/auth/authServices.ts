import apiClient from "../apiClient"
import {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "./authTypes"

const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  REFRESH_TOKEN: "/auth/refresh-token",
  LOGOUT: "/auth/logout",
} as const

export const authServices = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      AUTH_ENDPOINTS.LOGIN,
      credentials,
    )
    return response.data.data
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      AUTH_ENDPOINTS.REGISTER,
      userData,
    )
    return response.data.data
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      AUTH_ENDPOINTS.REFRESH_TOKEN,
      { refreshToken },
    )
    return response.data.data
  },

  logout: async (): Promise<void> => {
    await apiClient.post(AUTH_ENDPOINTS.LOGOUT)
  },

  getcurrentUser: async (): Promise<AuthResponse["user"]> => {
    const response =
      await apiClient.get<ApiResponse<AuthResponse["user"]>>("/auth/me")
    return response.data.data
  },
}
