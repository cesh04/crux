import { useThemeColors } from '@/hooks/useThemeColors'
import React from 'react'
import { Pressable, View } from 'react-native'; // 1. Import Pressable
import { SafeAreaView } from 'react-native-safe-area-context'
import Hamburger from '../assets/svgs/Hamburger'
import Logo from '../assets/svgs/Logo'
import Gradient from './Gradient'

// 2. Add type definition for the props
interface HeaderProps {
  onMenuPress: () => void;
}

const Header = ({ onMenuPress }: HeaderProps) => {
  const colors = useThemeColors();
  return (
    <Gradient className="h-[120] w-full p-4">
      <SafeAreaView 
        edges={["top", "left", "right"]} 
        className="flex-row items-end justify-between bg-transparent w-full">
        
        {/* 3. Wrap the Hamburger icon in a Pressable and add onPress */}
        <Pressable onPress={onMenuPress} className='my-[12]'>
          <Hamburger color={colors.logo}/>
        </Pressable>

        <Logo height={56} width={140} color={colors.logo}/>

        <View className="w-[28px] h-6" />
      </SafeAreaView>
    </Gradient>
  )
}

export default Header