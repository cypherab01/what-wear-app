import React from 'react';
import {Text, TextStyle, StyleSheet} from 'react-native';

interface DescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const Description: React.FC<DescriptionProps> = ({children, style}) => {
  return <Text style={[styles.description, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    width: '80%',
    lineHeight: 25,
    maxWidth: '90%',
    textAlign: 'center',
    fontFamily: 'Raleway-Light',
  },
});

export default Description;
