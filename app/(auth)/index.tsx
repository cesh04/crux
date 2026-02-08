import Logo from "@/assets/svgs/Logo";
import Gradient from "@/components/Gradient";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router } from "expo-router";
import React, { useEffect } from "react";

const Splash = () => {
  const colors = useThemeColors();

  useEffect(() => {
    // Wait 2 seconds for the animation/branding to be seen
    const timer = setTimeout(() => {
      // Navigate to the Login screen
      // Use replace() so the user can't "back" into the splash screen
      router.replace("/(auth)/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Gradient className="flex-1">
      <Logo height={105} width={263} color={colors.logo} />
    </Gradient>
  );
};

export default Splash;
