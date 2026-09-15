import React from "react"
import { Text, TextInput, TextInputProps, View } from "react-native"

interface InputProps extends TextInputProps {
  label: string
  error?: string
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  autoCapitalize,
  ...props
}) => {
  return (
    <View className="mb-4 w-full">
      <Text className="text-sm font-semibold text-gray-700 mb-1">{label}</Text>
      <TextInput
        className={`w-full px-4 py-3 rounded-xl bg-gray-50 border ${
          error ? "border-red-500" : "border-gray-200"
        } text-gray-900 focus:border-blue-600 focus:bg-white`}
        placeholderTextColor="#9CA3AF"
        autoCapitalize={autoCapitalize}
        {...props}
      />
      {error && <Text className="text-xs text-red-500 mt-1">{error}</Text>}
    </View>
  )
}
