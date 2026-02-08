import { useThemeColors } from '@/hooks/useThemeColors'
import React from 'react'
import { TextInput, View } from 'react-native'

type Props = {
  placeholder: string
  password?: boolean
  inputMode?: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url"
  value: string
  onChangeText: (text: string) => void
}

const TextField = ({ placeholder, password = false, inputMode, value, onChangeText }: Props) => {
  const colors = useThemeColors()
  return (
    <View className="m-[10px]">
      <TextInput
        editable
        secureTextEntry={password}
        inputMode={inputMode}
        placeholder={placeholder}
        style={{ borderColor: colors.fieldBorder }}
        placeholderTextColor={colors.fieldBorder}
        className="mb-4 text-white px-6 py-3 border-[1px] w-[360] h-[50] font-manrope rounded-[12]"
        autoCorrect={false}
        autoCapitalize={password || inputMode === 'email' ? "none" : "sentences"}
        textContentType={password ? "password" : "none"}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}


export default TextField