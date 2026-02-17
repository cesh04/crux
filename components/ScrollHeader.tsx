// components/CustomHeader.tsx
import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string;
};

export default function ScrollHeader({ title }: Props) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const baseHeight = Platform.OS === "ios" ? 44 : 56;
  const headerHeight = baseHeight + insets.top;

  return (
    <View
      className="flex-row items-center justify-between px-4"
      style={{ height: headerHeight, paddingTop: insets.top, backgroundColor: colors.backColor }}
    >
      <TouchableOpacity onPress={() => router.back()} hitSlop={20}>
        <Ionicons name="arrow-back" size={32} color={colors.scrollingFont} className="mt-2" />
      </TouchableOpacity>

      <Text
        className="text-[22px] font-semibold flex-1 text-center font-manropeBold"
        style={{ color: colors.scrollingFont }}
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* spacer to keep title centered */}
      <View className="w-6" />
    </View>
  );
}
