import { ApiResponse } from "@/app/types/api/api"
import { UserProfile } from "@/app/types/profile/profileTypes"
import { LoginRequest, RegisterRequest } from "../../app/types/auth/authTypes"
import apiClient from "../apiClient"

const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  REFRESH_TOKEN: "/auth/refresh-token",
  LOGOUT: "/auth/logout",
} as const

export const authServices = {
  login: async (credentials: LoginRequest): Promise<string> => {
    const response = await apiClient.post<ApiResponse<string>>(
      AUTH_ENDPOINTS.LOGIN,
      credentials,
    )
    return response.data.data
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

  getUser: async (email: string): Promise<UserProfile> => {
    const safeEmail = encodeURIComponent(email)
    const response = await apiClient.get<ApiResponse<UserProfile>>(
      `/users/${safeEmail}`,
    )
    console.log("response get user: ", response.data.data)
    return response.data.data
  },
}
