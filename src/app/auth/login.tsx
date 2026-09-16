import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import React from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function LoginScreen() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-6 py-8"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6 py-8">
            {/*Header/Branding*/}
            <View className="mb-4">
              <View className="mb-4">
                <Text className="text-3xl font-bold text-gray-900 text-center">
                  Selamat Datang 👋
                </Text>
              </View>
              <View className="mb-3">
                <Text className="text-base text-gray-500">
                  Masuk ke akun Loan System untuk mengelola pinjaman Anda
                </Text>
              </View>
            </View>

            {/*Form*/}
            <View className="mb-8">
              <Input
                label="Email"
                placeholder="nama@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <Input
                label="Kata Sandi"
                placeholder="••••••••"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity className="align-self-end mb-6">
                <Text className="text-sm font-semibold text-blue-600 text-right">
                  Lupa Kata Sandi?
                </Text>
              </TouchableOpacity>

              <Button title="Masuk" onPress={handleLogin} isLoading={loading} />

              {/*Footer*/}
              <View className="flex-row justify-center mt-5">
                <Text className="text-gray-500 text-sm">Belum punya akun?</Text>
                <TouchableOpacity>
                  <Text className="text-sm font-bold text-blue-600">
                    Daftar Sekarang
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

// import { verifyInstallation } from "nativewind"
// import { Text, View } from "react-native"

// export default function LoginScreen() {
//   verifyInstallation() // This will throw an error if Nativewind is not installed correctly
//   return (
//     <View className="flex-1 bg-red-600 justify-center items-center">
//       <Text className="text-white text-2xl font-bold">TAILWIND AKTIF!</Text>
//     </View>
//   )
// }
