import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {siteConfig} from '../config/data';
import {Button} from 'react-native-paper';
import colors from '../../Colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';

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
          <Text style={styles.title}>{siteConfig.name}</Text>
          <Text style={styles.description}>{siteConfig.description}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.primary.blue,
    fontFamily: 'Raleway-VariableFont_wght',
  },
  description: {
    fontSize: 16,
    fontWeight: '300',
    width: '80%',
    lineHeight: 25,
    maxWidth: '90%',
    textAlign: 'center',
    fontFamily: 'Raleway-VariableFont_wght',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
