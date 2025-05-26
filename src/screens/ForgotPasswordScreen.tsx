import {
  NavigationProp,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import React, {useEffect} from 'react';
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
import {Button, TextInput} from 'react-native-paper';
import colors from '../../Colors';
import {siteConfig} from '../config/site-config';
import Description from '../components/Typography/Description';
import Heading1 from '../components/Typography/Heading';
import {validateEmail} from '../utils/validate-email';
import {API_BASE_URL} from '@env';

type RootStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  OTPVerify: {email: string};
  ForgotPasswordScreen: {userEmail?: string};
  SignupScreen: {userEmail?: string};
  HomeScreen: undefined;
  ConfirmReset: {email: string};
};

type ForgotPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  'ForgotPasswordScreen'
>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<ForgotPasswordScreenRouteProp>();
  const userEmail = route.params?.userEmail;

  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail);
    }
  }, [userEmail]);

  const handleForgotPassword = async () => {
    if (!validateEmail(email)) {
      return Alert.alert('Invalid email');
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        body: JSON.stringify({email}),
      });

      const data = await response.json(); // Parse the response JSON once

      switch (response.status) {
        case 200:
          Alert.alert('Check your email', data.message, [
            {
              text: 'OK',
              onPress: () => navigation.navigate('ConfirmReset', {email}),
            },
          ]);
          break;

        case 404:
          Alert.alert('404 Not found', data.error, [
            {
              text: 'OK',
              onPress: () =>
                navigation.navigate('SignupScreen', {userEmail: email}),
            },
          ]);
          break;

        default:
          Alert.alert('Error', 'Something went wrong');
          break;
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
            Forgot your password? Enter your email to reset it.
          </Description>
          <TextInput
            textColor={colors.neutral.textPrimary}
            theme={{colors: {primary: colors.primary.blue}}}
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleForgotPassword}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}>
            Submit
          </Button>
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
    textAlign: 'center',
    maxWidth: '70%',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: colors.neutral.white,
  },

  button: {
    marginTop: 10,
  },
});
