import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
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

export default function ForgotPasswordScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
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

          <Button mode="contained" onPress={handleLogin} style={styles.button}>
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
