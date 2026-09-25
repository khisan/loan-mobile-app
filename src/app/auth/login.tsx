import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useAuth } from "@/hooks/useAuth"
import { LoginSchema, LoginSchemaType } from "@/utils/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
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
  const router = useRouter()

  // 1. Panggil hook useAuth di dalam komponen
  const { login, isLoading: IsGlobalLoading } = useAuth()

  // State lokal untuk error handling/status loading tombol
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Fungsi onSubmit yang memanggil login() dari AuthContext
  const onSubmit = async (data: LoginSchemaType) => {
    setIsSubmitting(true)
    try {
      // Panggil fungsi login dari AuthContext dengan data form
      await login(data)

      // Jika berhasil, redirect ke dashboard
      router.replace("/main/dashboard")
    } catch (error: any) {
      // Tangkap error dari backend SpringBoot
      const errorMessage =
        error?.response?.data?.message ||
        "Gagal masuk. Periksa email dan password Anda."
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLoading = isSubmitting || IsGlobalLoading

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
            {/*Form*/}
            <View className="mb-8">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Email"
                    placeholder="nama@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={field.value ?? ""}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    error={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Kata Sandi"
                    placeholder="••••••••"
                    secureTextEntry
                    autoCapitalize="none"
                    value={field.value ?? ""}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    error={errors.password?.message}
                  />
                )}
              />
              <TouchableOpacity className="align-self-end mb-6">
                <Text className="text-sm font-semibold text-blue-600 text-right">
                  Lupa Kata Sandi?
                </Text>
              </TouchableOpacity>

              <Button
                title="Masuk"
                onPress={handleSubmit(onSubmit)}
                isLoading={isLoading}
              />

              {/*Footer*/}
              <View className="flex-row justify-center mt-5">
                <Text className="text-gray-500 text-sm">Belum punya akun?</Text>
                <TouchableOpacity>
                  <Text className="text-sm font-bold text-blue-600 mx-1">
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
