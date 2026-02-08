import { BlurView } from 'expo-blur'
import { Text, TouchableOpacity } from 'react-native'

import { useThemeColors } from '@/hooks/useThemeColors'
import React from 'react'

const ContinueWith = () => {
  const colors = useThemeColors();
  
  return (
    <BlurView 
              className='absolute bottom-0 p-[35px] w-full justify-center items-center rounded-t-[15px]' 
              tint="dark"
              intensity={50}
              style={{ borderTopLeftRadius: 37, borderTopRightRadius: 37, overflow: 'hidden' }}
            >
              <TouchableOpacity style={{ borderColor: colors.fieldBorder }}
                className='
                mb-8
                text-white
                px-6 py-3
                border-[1px] 
                focus:border-[1.8px]
                w-[360] h-[50]
                font-manrope
                rounded-[12]
                justify-center
            '
              >
                <Text className='text-white font-manrope'>Continue with Google</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style={{ borderColor: colors.fieldBorder }}
                className='
                mb-[55px]
                text-white
                px-6 py-3
                border-[1px] 
                focus:border-[1.8px]
                w-[360] h-[50]
                font-manrope
                rounded-[12]
                justify-center
            '
              >
                <Text className='text-white font-manrope'>Continue with Apple</Text>
              </TouchableOpacity>
    
            </BlurView>
  )
}

export default ContinueWith