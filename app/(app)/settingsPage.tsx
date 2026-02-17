import ScrollHeader from '@/components/ScrollHeader';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const SettingsPage = () => {
  const colors = useThemeColors();
  const router = useRouter();

  const settingsOptions = [
    {
      id: 'profile',
      label: 'Profile',
      // icon: <ProfileIcon />, // TODO: Import your Profile SVG here
      onPress: () => {
        // router.push('/(app)/profile');
        console.log('Navigate to Profile');
      },
    },
    {
      id: 'appearance',
      label: 'Appearance',
      // icon: <AppearanceIcon />, // TODO: Import your Appearance SVG here
      onPress: () => {
        // router.push('/(app)/appearance');
        console.log('Navigate to Appearance');
      },
    },
    {
      id: 'backup',
      label: 'Backup and Restore',
      // icon: <BackupIcon />, // TODO: Import your Backup SVG here
      onPress: () => {
        // router.push('/(app)/backup');
        console.log('Navigate to Backup');
      },
    },
  ];

  return (
    <View
      className="flex-1"
      style={{ 
        backgroundColor: colors.backColor /* Fill: Main background color */
      }} 
    >
      <ScrollHeader title="Settings" />

      <ScrollView className="flex-1 px-4 pt-6">
        {settingsOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={option.onPress}
            className="flex-row items-center justify-between p-5 mb-4 rounded-[15px] border-[2px]"
            style={{
              borderColor: colors.cardBorder, /* Fill: Border color for the item card */
              backgroundColor: colors.backColor /* Fill: Optional background for the item */
            }}
          >
            <View className="flex-row items-center">
              {/* Icon Container Placeholder */}
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-4"
                style={{ 
                    // backgroundColor: colors.fieldBorder /* Fill: Background for icon circle */
                }} 
              >
                {/* Placeholder Text for Icon - Replace with option.icon */}
                <Text style={{ color: colors.fontColor }}>Icon</Text>
              </View>

              <Text
                className="text-lg font-manropeBold"
                style={{ 
                    color: colors.fontColor /* Fill: Text color for label */
                }} 
              >
                {option.label}
              </Text>
            </View>

            {/* Chevron Placeholder */}
            <Text 
                className="text-xl font-manrope"
                style={{ 
                    color: colors.fontColor /* Fill: Chevron color */
                }}
            >
                ›
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SettingsPage;