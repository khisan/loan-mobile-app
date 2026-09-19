import axios from "axios"
import * as SecureStore from "expo-secure-store"

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = SecureStore.getItemAsync("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      SecureStore.deleteItemAsync("authToken")
      console.error("Unauthorized access. Token has been removed.")
    } else if (error.request) {
      console.error("No response received from the server.")
    } else {
      console.error("Error in setting up the request:", error.message)
    }
    return Promise.reject(error)
  },
)

export default apiClient
