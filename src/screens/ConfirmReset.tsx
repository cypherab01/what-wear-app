import {API_BASE_URL} from '@env';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import colors from '../../Colors';
import Description from '../components/Typography/Description';
import Heading1 from '../components/Typography/Heading';

type RootStackParamList = {
  OTPVerify: {email: string};
  ConfirmReset: {email: string};
};

type OTPVerifyScreenRouteProp = RouteProp<RootStackParamList, 'OTPVerify'>;

const ConfirmReset = () => {
  const navigation = useNavigation();
  const route = useRoute<OTPVerifyScreenRouteProp>();
  const {email} = route.params;

  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmReset = async () => {
    if (!otp || !password) {
      return Alert.alert('Error', 'Please enter OTP and new password');
    }

    if (password.length < 8) {
      return Alert.alert(
        'Error',
        'Password must be at least 8 characters long',
      );
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        body: JSON.stringify({email, otp, password}),
      });

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert('Success', data.message);
        navigation.navigate('LoginScreen' as never);
      } else if (response.status === 401) {
        Alert.alert('Error', data.error || 'Invalid OTP');
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
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
          <Heading1>Choose a new password</Heading1>
          <Description style={styles.description}>
            Please enter the OTP sent to your email address and choose a new
            password
          </Description>

          <TextInput
            value={email}
            label="Email"
            mode="outlined"
            style={styles.input}
            editable={false}
            textColor={colors.neutral.textPrimary}
            theme={{colors: {primary: colors.primary.blue}}}
          />

          <TextInput
            value={otp}
            onChangeText={setOtp}
            label="OTP"
            mode="outlined"
            style={styles.input}
            textColor={colors.neutral.textPrimary}
            theme={{colors: {primary: colors.primary.blue}}}
            keyboardType="number-pad"
            maxLength={6}
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            label="New Password"
            mode="outlined"
            style={styles.input}
            textColor={colors.neutral.textPrimary}
            theme={{colors: {primary: colors.primary.blue}}}
            secureTextEntry
          />

          <Button
            mode="contained"
            onPress={handleConfirmReset}
            disabled={isLoading}
            loading={isLoading}
            style={styles.button}>
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

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
  description: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: colors.neutral.white,
  },
  button: {
    marginTop: 10,
  },
});

export default ConfirmReset;
