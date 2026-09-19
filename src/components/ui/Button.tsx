import { ActivityIndicator, Text, TouchableOpacity } from "react-native"

interface ButtonProps {
  title: string
  onPress: () => void
  isLoading?: boolean
}

export const Button = ({
  title,
  onPress,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
      className="w-full bg-blue-600 py-3.5 rounded-xl items-center justify-center shadow-sm shadow-blue-500/30"
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-white font-bold text-base">{title}</Text>
      )}
    </TouchableOpacity>
  )
}
