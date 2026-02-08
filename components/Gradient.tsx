import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ViewProps } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

type Props = ViewProps & {
  children?: React.ReactNode;
  className?: string;
};

const Gradient = ({ children, className, ...rest }: Props) => {

    const themeColors = useThemeColors();
  return (
    <LinearGradient
      colors={[themeColors.x, themeColors.y, themeColors.z]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      className={`justify-center items-center ${className ?? ""}`}
      {...rest}
    >
      {children}
    </LinearGradient>
  );
};

export default Gradient;
