import { useThemeColors } from '@/hooks/useThemeColors';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Hamburger from '../assets/svgs/Hamburger';
import Logo from '../assets/svgs/Logo';
import Gradient from './Gradient';

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
        
        {/* Added hitSlop to significantly increase touch area */}
        <Pressable 
          onPress={onMenuPress} 
          className='my-[12]'
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Hamburger color={colors.logo}/>
        </Pressable>

        <Logo height={56} width={140} color={colors.logo}/>

        <View className="w-[28px] h-6" />
      </SafeAreaView>
    </Gradient>
  )
}

export default Header;