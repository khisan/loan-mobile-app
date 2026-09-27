export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  fullName: string
  email: string
  password: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface UserProfile {
  name: string
  email: string
  role: "user" | "admin"
}

export type AuthToken = string

export interface ApiResponse<T> {
  data: T
  message: string
  status: number
}
