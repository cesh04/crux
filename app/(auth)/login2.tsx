import Logo from "@/assets/svgs/Logo";
import ContinueWith from "@/components/ContinueWith";
import Button from "@/components/CustomButton";
import Gradient from "@/components/Gradient";
import TextField from "@/components/TextField";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text } from "react-native";
import { auth } from "../../firebaseConfig";


const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

const validatePassword = (password: string) => {
  return password.trim().length >= 6; // Firebase requires at least 6 chars
};

const Login2 = () => {
  // const name = "Neal";
  const params = useLocalSearchParams();
  const email = Array.isArray(params.email) ? params.email[0] : params.email ?? "";
  const [password, setPassword] = useState("");
  const colors = useThemeColors();
  const router = useRouter();
  // if(!email) return null; // for testing

  const tempOnPress = () => {
    if (!validateEmail(email)) return Alert.alert("Enter a valid email");
    else if (!validatePassword(password))
      return Alert.alert("Password must be at least 6 characters");
    else{
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.replace("/(app)/home");
      })
      .catch((error) => {
        Alert.alert(error.code, error.message);
      });
    }

    
  };

  // console.log("Email: ", email); // for testing

  const tempForgotPassword = () => {
    router.push("/(app)/home");
  };

  return (
    <Gradient className="flex-1">
      <KeyboardAvoidingView
        className="flex-1 justify-center items-center"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Logo
          className="mb-[100]"
          height={105}
          width={263}
          color={colors.logo}
        />

        {/* <Text 
            className='font-manropeBold text-3xl ml-6 mt-6 text-white' 
            style={{ color: '#FFFFFF' }}>
                Hi {name},
        </Text> */}

        <TextField
          placeholder="Enter password"
          password
          value={password}
          onChangeText={setPassword}
        />

        <Pressable onPress={tempForgotPassword} className="mb-[20]">
          <Text className="font-manrope text-lg text-white">
            Forgot Password?
          </Text>
        </Pressable>

        <Button text="Continue" className="mb-[90px]" onPress={tempOnPress} />

        <ContinueWith />
      </KeyboardAvoidingView>
    </Gradient>
  );
};

export default Login2;
