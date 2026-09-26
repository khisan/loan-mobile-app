import apiClient from "../apiClient"
import { ApiResponse, LoginRequest, RegisterRequest } from "./authTypes"

const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  REFRESH_TOKEN: "/auth/refresh-token",
  LOGOUT: "/auth/logout",
} as const

export const authServices = {
  login: async (credentials: LoginRequest): Promise<string> => {
    const response = await apiClient.post<string>(
      AUTH_ENDPOINTS.LOGIN,
      credentials,
      { responseType: "text" },
    )
    // Ambil string JWT dari response.data, atau gunakan response itu sendiri jika Axios di RN mereturn string murni
    const rawData = response.data ?? response
    const token = typeof rawData === "string" ? rawData : String(rawData)
    console.log("response utuh auth services: ", response)
    console.log("token: ", token)
    return token
  },

  register: async (userData: RegisterRequest): Promise<string> => {
    const response = await apiClient.post<ApiResponse<string>>(
      AUTH_ENDPOINTS.REGISTER,
      userData,
    )
    return response.data.data
  },

  refreshToken: async (refreshToken: string): Promise<string> => {
    const response = await apiClient.post<ApiResponse<string>>(
      AUTH_ENDPOINTS.REFRESH_TOKEN,
      { refreshToken },
    )
    return response.data.data
  },

  logout: async (): Promise<void> => {
    await apiClient.post(AUTH_ENDPOINTS.LOGOUT)
  },

  getcurrentUser: async (): Promise<string> => {
    const response = await apiClient.get<ApiResponse<string>>("/auth/me")
    return response.data.data
  },
}
