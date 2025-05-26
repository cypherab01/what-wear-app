import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {siteConfig} from '../config/site-config';
import {Button} from 'react-native-paper';
import colors from '../../Colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Heading1 from '../components/Typography/Heading';
import Description from '../components/Typography/Description';

type RootStackParamList = {
  LoginScreen: undefined;
};

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text>Welcome to {siteConfig.name}</Text> */}
      </View>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/BrandLogo.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.titleContainer}>
          <Heading1>{siteConfig.name}</Heading1>
          <Description>{siteConfig.description}</Description>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          icon={{
            source: 'arrow-right',
            direction: 'ltr',
          }}
          style={{
            width: '90%',
            borderColor: colors.primary.blue,

            borderWidth: 4,
          }}
          buttonColor={colors.primary.blue}
          textColor={colors.neutral.white}
          mode="contained-tonal"
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}>
          Get Started
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral.white,
    padding: 20,
    borderRadius: 999,
    elevation: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  titleContainer: {
    gap: 10,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
