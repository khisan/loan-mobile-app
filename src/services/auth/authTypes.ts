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
  id: string
  email: string
  fullName: string
  role: "user" | "admin"
  avatarUrl?: string
  createdAt: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: UserProfile
}

export interface ApiResponse<T> {
  data: T
  message: string
  status: number
}
