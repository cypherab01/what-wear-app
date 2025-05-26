import React from 'react';
import {Text, TextStyle, StyleSheet} from 'react-native';
import colors from '../../../Colors';

interface Heading1Props {
  children: React.ReactNode;
  style?: TextStyle;
}

const Heading1: React.FC<Heading1Props> = ({children, style}) => {
  return <Text style={[styles.heading1, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  heading1: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.primary.blue,
    fontFamily: 'Raleway-Bold',
  },
});

export default Heading1;
