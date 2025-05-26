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
import {NavigationProp} from '@react-navigation/native';
import Heading1 from '../components/Typography/Heading';
import Description from '../components/Typography/Description';
import {env} from '../config/env';
import {validateEmail} from '../utils/validate-email';

export default function SignupScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignup = async () => {
    try {
      if (!fullName || !email || !password) {
        Alert.alert('Error', 'Please fill all the fields');
        return;
      }

      if (fullName.length < 3) {
        Alert.alert('Error', 'Full name must be at least 3 characters long');
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

      const response = await fetch(`${env.API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: fullName, email, password}),
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Signup successful, please verify your email', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('OTPVerify', {email}),
          },
        ]);
      } else if (response.status === 403) {
        const data = await response.json();
        Alert.alert('Verify Email', data.error, [
          {
            text: 'OK',
            onPress: () => navigation.navigate('OTPVerify', {email}),
          },
        ]);
      } else if (response.status === 409) {
        const data = await response.json();
        Alert.alert('Error', data.error, [
          {
            text: 'OK',
            onPress: () => navigation.navigate('LoginScreen'),
          },
        ]);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Something went wrong, make sure you are connected to the internet',
      );
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
            Sign up for a {siteConfig.name} account
          </Description>

          <TextInput
            textColor={colors.neutral.textPrimary}
            theme={{colors: {primary: colors.primary.blue}}}
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />

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
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            Forgot password?
          </Text>

          <Button mode="contained" onPress={handleSignup} style={styles.button}>
            Sign up
          </Button>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <Text
              style={styles.signupLink}
              onPress={() => navigation.navigate('LoginScreen')}>
              Login
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
  title: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary.blue,
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
