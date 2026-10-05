import { ENV } from "@/config/env"
import axios from "axios"
import * as secureStore from "../utils/secureStore"

const apiClient = axios.create({
  baseURL: ENV.API_URL,
  timeout: ENV.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use(
  async (config) => {
    const token = await secureStore.tokenStorage.getAccessToken()
    if (token) {
      const cleanToken = token.replace(/^"(.*)"$/, "$1").trim() // Bersihkan tanda kutip ganda ("") dan newline/spasi jika ada
      config.headers.Authorization = `Bearer ${cleanToken}`
    }
    config.headers.set("Content-Type", "application/json")
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      secureStore.tokenStorage.clearAuthSession()
      console.error("Unauthorized access. Token has been removed.")
    } else if (error.request) {
      console.error("error: ", error)
      console.error("No response received from the server.")
    } else {
      console.error("Error in setting up the request:", error.message)
    }
    console.log("BASE_URL dipanggil:", apiClient.defaults.baseURL)
    return Promise.reject(error)
  },
)

export default apiClient
