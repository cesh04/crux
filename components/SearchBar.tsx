import SearchIcon from '@/assets/svgs/SearchIcon';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Pressable, StyleProp, Text, TextInput, View, ViewStyle } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
  onSubmit?: () => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

const SearchBar = ({
  value,
  onChangeText,
  editable,
  onSubmit,
  placeholder = 'Enter your topic here!',
  style,
}: SearchBarProps) => {
  const colors = useThemeColors();

  return (
    <View
      className="flex-row items-center rounded-full px-4 py-3"
      style={[{ backgroundColor: colors.cardBorder }, style]}
    >
      <SearchIcon color={colors.fontColor} />
      <TextInput
        className="flex-1 ml-2 text-base font-manrope"
        style={{ color: colors.scrollingFont }} // Use the bright color for typed text
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit} // For when user hits 'Enter'
        placeholder={placeholder}
        placeholderTextColor={colors.fontColor} // Use the dimmer color for placeholder
        returnKeyType="search"
      />

      {/* Button shows up only when user types something */}
      {value.length > 0 && (
        <Pressable
          onPress={onSubmit}
          className="rounded-full px-4 py-1.5 ml-2"
          style={{ backgroundColor: colors.y }}
        >
          <Text 
            className="font-manropeBold text-sm"
            style={{ color: colors.scrollingFont }}
          >
            Go!
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;