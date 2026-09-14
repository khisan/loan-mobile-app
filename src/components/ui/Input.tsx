import React from "react"
import { TextInputProps } from "react-native"

interface InputProps extends TextInputProps {
  label: string
  error?: string
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {}
