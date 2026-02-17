import LogOut from '@/assets/svgs/LogOut';
import Settings from '@/assets/svgs/Settings';
import { useThemeColors } from "@/hooks/useThemeColors";
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { Alert, Animated, Dimensions, Easing, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../firebaseConfig';

interface HomeBurgerProps {
  isVisible: boolean;
  onClose: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeBurger = ({ isVisible, onClose }: HomeBurgerProps) => {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Animate slide when modal becomes visible
  useEffect(() => {
    if (isVisible) {
      slideAnim.setValue(0);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300, // Smooth 300ms animation
        easing: Easing.out(Easing.cubic), // Decelerate smoothly
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250, // Slightly faster exit
      easing: Easing.in(Easing.cubic), // Accelerate out
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const proceedToLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleLogout = () => {
    closeMenu();
    // Add small delay to let animation start smoothly before Alert
    setTimeout(() => {
      Alert.alert(
        'Sign Out?',
        'Are you sure? Your data is saved and will be here when you log back in.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Sign Out',
            style: 'destructive',
            onPress: proceedToLogout,
          },
        ]
      );
    }, 100);
  };

  const goToSettings = () => {
    closeMenu();
    router.push('/(app)/settingsPage');
  };

  const colors = useThemeColors();

  const drawerTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH, 0],
  });

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none" // Disable default animation
      onRequestClose={closeMenu} // Handle hardware back button
    >
      <View style={{ flex: 1 }}>
        {/* Backdrop - Fades in/out */}
        <Animated.View 
            style={{ 
                ...StyleSheet.absoluteFillObject, 
                opacity: slideAnim,
                backgroundColor: 'rgba(0,0,0,0.5)' 
            }}
        >
            <Pressable onPress={closeMenu} style={{ flex: 1 }} />
        </Animated.View>

        {/* Drawer - Slides in/out */}
        <Animated.View 
            style={{ 
                position: 'absolute', top: 0, bottom: 0, left: 0,
                width: '75%', maxWidth: 320, // Matches w-3/4 max-w-xs
                transform: [{ translateX: drawerTranslateX }],
                backgroundColor: colors.backColor,
                shadowColor: "#000", 
                shadowOffset: {width: 0, height: 2}, 
                shadowOpacity: 0.25, 
                shadowRadius: 3.84, 
                elevation: 5
            }}
        >
            <SafeAreaView style={{ flex: 1 }}>
              <View className="px-5 py-6">
                <Text 
                  className="text-3xl font-bold"
                  style={{ color: colors.fontColor }}
                >
                  Menu
                </Text>
              </View>

              <View 
                className="border-b mx-5" 
                style={{ borderColor: colors.fieldBorder }} 
              />

              <View className="mt-4">
                <TouchableOpacity
                  onPress={goToSettings}
                  className="flex-row items-center px-5 py-4"
                >
                  <Settings color={colors.fontColor} /> 
                  <Text 
                    className="text-lg ml-4"
                    style={{ color: colors.fontColor }}
                  >
                    Settings
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleLogout}
                  className="flex-row items-center px-5 py-4"
                >
                  <LogOut color={colors.fontColor} />
                  <Text 
                    className="text-lg ml-4"
                    style={{ color: colors.fontColor }}
                  >
                    Sign out
                  </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default HomeBurger;