import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { LoginSchema, LoginSchemaType } from "@/utils/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
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
  const [loading, setLoading] = React.useState(false)

  const onSubmit = (data: LoginSchemaType) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1500)
    console.log(data)
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
                isLoading={loading}
              />

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
