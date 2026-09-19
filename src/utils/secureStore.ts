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
  saveAccessToken: async (token: string) => {
    await setItem("ACCESS_TOKEN", token)
  },
  getAccessToken: async () => {
    return await getItem("ACCESS_TOKEN")
  },
  clearAuthSession: async () => {
    await deleteItem("ACCESS_TOKEN")
    await deleteItem("REFRESH_TOKEN")
    await deleteItem("USER_DATA")
  },
}
