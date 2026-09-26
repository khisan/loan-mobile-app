import { authServices } from "@/services/auth/authServices"
import { tokenStorage } from "@/utils/secureStore"
import { createContext, useState } from "react"
import { AuthResponse, LoginRequest } from "../services/auth/authTypes"

interface AuthContextType {
  user: AuthResponse["user"] | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Fungsi Login
  const login = async (credential: LoginRequest) => {
    setIsLoading(true)
    try {
      // 1. Panggil API Spring Boot lewat authservice
      const response = await authServices.login(credential)

      // 2. Simpan token ke SecureStore
      await tokenStorage.saveAccessToken(response)
    } catch (error) {
      console.error("Login Error: ", error)
      throw error // Throw balik agar error nya bisa di cath oleh UI login (form)
    } finally {
      setIsLoading(false)
    }
  }

  // Fungsi Logout
  const logout = async () => {
    setIsLoading(true)
    try {
      await authServices.logout
    } catch (e) {
      // Abaikan jika error server gagal
    } finally {
      await tokenStorage.clearAuthSession()
      setUser(null)
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
