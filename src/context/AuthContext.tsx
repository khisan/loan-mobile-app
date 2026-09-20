import { createContext } from "react"
import { AuthResponse, LoginRequest } from "../services/auth/authTypes"

interface AuthContextType {
  user: AuthResponse["user"] | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
