import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import colors from '../../Colors';
import {siteConfig} from '../config/site-config';
import {Button, TextInput} from 'react-native-paper';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Heading1 from '../components/Typography/Heading';
import Description from '../components/Typography/Description';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from '@env';
import {validateEmail} from '../utils/validate-email';

type RootStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  OTPVerify: {email: string};
  ForgotPasswordScreen: {userEmail?: string};
  SignupScreen: {userEmail?: string};
  HomeScreen: undefined;
};

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    if (!email && !password) {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }

    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (response.status === 200) {
        const data = await response.json();
        const token = data?.token;
        await AsyncStorage.setItem('token', token);
        navigation.navigate('HomeScreen');
      } else if (response.status === 404) {
        const data = await response.json();
        Alert.alert('404 Not found', data.error);
      } else if (response.status === 403) {
        const data = await response.json();
        Alert.alert('Verification required', data.error, [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('SignupScreen', {userEmail: email}),
          },
        ]);
      } else if (response.status === 401) {
        const data = await response.json();
        Alert.alert('Error', data.error);
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Something went wrong, make sure you are connected to the internet',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <Heading1>{siteConfig.name}</Heading1>
          <Description style={styles.loginText}>
            Login to your {siteConfig.name} account
          </Description>
          <TextInput
            textColor={colors.neutral.textPrimary}
            theme={{colors: {primary: colors.primary.blue}}}
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            textColor={colors.neutral.textPrimary}
            theme={{colors: {primary: colors.primary.blue}}}
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <Text
            style={styles.forgotPassword}
            onPress={() =>
              navigation.navigate('ForgotPasswordScreen', {userEmail: email})
            }>
            Forgot password?
          </Text>

          <Button
            mode="contained"
            disabled={isLoading}
            onPress={handleLogin}
            style={styles.button}
            loading={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <Text
              style={styles.signupLink}
              onPress={() =>
                navigation.navigate('SignupScreen', {userEmail: email})
              }>
              Sign up
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
  loginText: {
    alignSelf: 'center',
  },
  input: {
    backgroundColor: colors.neutral.white,
  },
  forgotPassword: {
    fontSize: 16,
    color: colors.primary.blue,
    alignSelf: 'flex-end',
    paddingRight: 4,
  },
  button: {
    marginTop: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  signupText: {
    fontSize: 16,
    color: colors.neutral.textSecondary,
  },
  signupLink: {
    fontSize: 16,
    color: colors.primary.blue,
  },
});
