import { useThemeColors } from '@/hooks/useThemeColors';
import React from 'react';
import { Pressable, Text } from 'react-native';

type Props = {
  text: string;
  className?: string;
  onPress?: () => void;
};

const Button = ({ text, className, onPress }: Props) => {
  const themeColors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      className={`
        w-[360] h-[50]
        border
        rounded-[12]
        px-6 py-3
        items-center justify-center
        bg-buttonColor
        pressed:opacity-50
        ${className}
      `}
    >
      <Text className="text-white font-manropeBold">{text}</Text>
    </Pressable>
  );
};

export default Button;
