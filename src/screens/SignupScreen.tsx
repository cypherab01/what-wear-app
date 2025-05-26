import {
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

export default function SignupScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    console.log(email, password);
    navigation.navigate('HomeScreen');
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

          <Button mode="contained" onPress={handleLogin} style={styles.button}>
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
