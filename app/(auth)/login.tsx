import Logo from '@/assets/svgs/Logo';
import ContinueWith from '@/components/ContinueWith';
import Button from '@/components/CustomButton';
import Gradient from '@/components/Gradient';
import TextField from '@/components/TextField';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useRouter } from 'expo-router';
import { fetchSignInMethodsForEmail } from "firebase/auth";
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { auth } from "../../firebaseConfig";

const Login = () => {

  const colors = useThemeColors();
  const router = useRouter();
  const [email, setEmail] = useState('');

  const onPress = async () => {
  try {
    const cleanedEmail = email.trim().toLowerCase();
    const methods = await fetchSignInMethodsForEmail(auth, cleanedEmail);
    //console.log("Fetched methods:", methods);
    if (methods.length > 0) {
      router.push({ pathname: "/(auth)/login2", params: { email: cleanedEmail } });
    } else {
      router.push({ pathname: "/(auth)/newUser", params: { email: cleanedEmail } });
    }
  } catch (err) {
    console.error("Error checking email:", err);
  }
};

  return (
    <Gradient className='flex-1'>
      <KeyboardAvoidingView
        className='flex-1 justify-center items-center'
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
      >
        <Logo className='mb-[120]' height={105} width={263} color={colors.logo}/>
        <TextField placeholder='Email address' inputMode='email' value={email} onChangeText={setEmail}/>

        <Button text="Continue" className='mb-[90px]' onPress={onPress}/>

        <ContinueWith />

      </KeyboardAvoidingView>
    </Gradient>
  )
}

export default Login;

