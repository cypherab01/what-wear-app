import {API_BASE_URL} from '@env';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import colors from '../../Colors';
import Heading1 from '../components/Typography/Heading';
import Description from '../components/Typography/Description';

type RootStackParamList = {
  OTPVerify: {email: string};
};

type OTPVerifyScreenRouteProp = RouteProp<RootStackParamList, 'OTPVerify'>;

const OTPVerify = () => {
  const navigation = useNavigation();
  const route = useRoute<OTPVerifyScreenRouteProp>();
  const {email} = route.params;
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOTPVerify = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter OTP');
      return;
    }

    if (otp.length !== 6) {
      Alert.alert('Error', 'OTP must be 6 digits');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, otp}),
      });
      if (response.status === 200) {
        navigation.navigate('HomeScreen' as never);
      } else if (response.status === 400) {
        const data = await response.json();
        Alert.alert('Error', data.error);
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
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
          <Heading1>Verify Your Email</Heading1>
          <Description style={styles.description}>
            Please enter the OTP sent to your email address
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

          <Button
            mode="contained"
            onPress={handleOTPVerify}
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

export default OTPVerify;
