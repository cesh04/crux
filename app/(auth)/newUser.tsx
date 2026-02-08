import Logo from "@/assets/svgs/Logo";
import Button from "@/components/CustomButton";
import Gradient from "@/components/Gradient";
import TextField from "@/components/TextField";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { auth, db } from "../../firebaseConfig";

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

const validatePassword = (password: string) => {
  return password.trim().length >= 6; // Firebase requires at least 6 chars
};

const NewUserCreation = () => {
  const [name, setName] = useState("");
  const [newPass, setNewPass] = useState("");
  const colors = useThemeColors();
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = Array.isArray(params.email)
    ? params.email[0]
    : (params.email ?? "");

const handleSignUp = async () => {
  if (!name) {
    return Alert.alert("Please enter your name");
  }

  if (!validateEmail(email)) return Alert.alert("Enter a valid email");
  else if (!validatePassword(newPass))
    return Alert.alert("Password must be at least 6 characters");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, newPass);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: name, 
      createdAt: serverTimestamp()
    });

    router.replace('/(app)/home'); 

  } catch (error: any) {
    Alert.alert(error.code, error.message);
  }
};

  // if (!email) return null; //for testing
  // console.log("Email: ", email); // for testing

  return (
    <Gradient className="flex-1">
      <KeyboardAvoidingView
        className="flex-1 justify-center items-center"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Logo
          className="mb-[120]"
          height={105}
          width={263}
          color={colors.logo}
        />
        <TextField
          placeholder="Name"
          inputMode="text"
          value={name}
          onChangeText={setName}
        />
        <TextField
          placeholder="Create Password"
          password
          value={newPass}
          onChangeText={setNewPass}
        />

        <Button text="Continue" className="mb-[90px]" onPress={handleSignUp} />
      </KeyboardAvoidingView>
    </Gradient>
  );
};

export default NewUserCreation;
