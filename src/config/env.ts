import { Platform } from "react-native"

/**
 * Penanganan IP Address untuk koneksi ke Backend Spring Boot:
 * 1. Android Emulator -> Gunakan 10.0.2.2 (Alias localhost PC di emulator Android)
 * 2. iOS Simulator    -> Gunakan localhost
 * 3. HP Fisik / Expo   -> Masukkan IP Wi-Fi PC kamu (misal: 192.168.1.X)
 */
const getDevBaseUrl = () => {
  if (Platform.OS === "android") {
    // return 'http://10.0.2.2:8080/api'; // Khusus Emulator Android
    return "http://10.71.182.71:8080/api" // Khusus Emulator Android
  }
}

export const ENV = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || getDevBaseUrl(),
  TIMEOUT: 10000,
} as const
