import LogOut from '@/assets/svgs/LogOut';
import Settings from '@/assets/svgs/Settings';
import { useThemeColors } from "@/hooks/useThemeColors";
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
// Import TouchableOpacity from 'react-native'
import { Alert, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
// We no longer need this import:
// import { TouchableOpacity } from 'react-native-gesture-handler'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../firebaseConfig'; // Make sure this path is correct

interface HomeBurgerProps {
  isVisible: boolean;
  onClose: () => void;
}

const HomeBurger = ({ isVisible, onClose }: HomeBurgerProps) => {
  const router = useRouter();

  const proceedToLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleLogout = () => {
    onClose();
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
  };

  const goToSettings = () => {
    onClose();
    // Make sure this settings page exists: /app/(app)/settings.tsx
    router.push('/(app)/settingsPage');
  };

  const colors = useThemeColors();

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose} className="flex-1 bg-black/50">
        <Pressable
          className={`
            absolute top-0 left-0 h-full w-3/4 max-w-xs
            shadow-lg
          `}
          // Use inline style for dynamic background color from hook
          style={{ backgroundColor: colors.cardBorder }}
        >
          <SafeAreaView className="flex-1">
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
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default HomeBurger;