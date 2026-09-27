import { UserProfile } from "@/services/auth/authTypes"
import * as SecureStore from "expo-secure-store"

const KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_DATA: "user_data",
} as const

export const setItem = async (
  key: keyof typeof KEYS,
  value: string,
): Promise<void> => {
  try {
    await SecureStore.setItemAsync(KEYS[key], value)
  } catch (error) {
    console.error(`Error setting item ${key} in secure store:`, error)
  }
}

export const getItem = async (
  key: keyof typeof KEYS,
): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(KEYS[key])
  } catch (error) {
    console.error(`Error getting item ${key} from secure store:`, error)
    return null
  }
}

export const deleteItem = async (key: keyof typeof KEYS): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(KEYS[key])
  } catch (error) {
    console.error(`Error deleting item ${key} from secure store:`, error)
  }
}

export const tokenStorage = {
  saveAccessToken: async (token: string): Promise<void> => {
    try {
      await setItem("ACCESS_TOKEN", token)
    } catch (error) {
      console.error("Error saving token to storage: ", error)
      throw error
    }
  },
  getAccessToken: async (): Promise<string | null> => {
    try {
      const token = await getItem("ACCESS_TOKEN")
      if (!token || token?.trim() === "") {
        return null
      }
      return token
    } catch (error) {
      console.error("Error reading access token from storage: ", error)
      throw error
    }
  },
  saveUserData: async (userData: UserProfile): Promise<void> => {
    try {
      const stringifiedUserData = JSON.stringify(userData)
      await setItem("USER_DATA", stringifiedUserData)
    } catch (error) {
      console.error("Error saving user data to storage: ", error)
      throw error
    }
  },
  getUserData: async () => {
    try {
      const rawData = await getItem("USER_DATA")
      if (!rawData) return null
      const userData: UserProfile = JSON.parse(rawData)
      return userData
    } catch (error) {
      console.error("Error reading user data from storage: ", error)
      throw error
    }
  },
  clearAuthSession: async () => {
    await deleteItem("ACCESS_TOKEN")
    await deleteItem("REFRESH_TOKEN")
    await deleteItem("USER_DATA")
  },
}
