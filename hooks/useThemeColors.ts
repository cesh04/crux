import { useColorScheme } from "react-native";
import { dC, lC } from '../theme/colors';

export function useThemeColors () {
    const scheme = useColorScheme();
    return scheme === "dark" ? dC : lC;
}