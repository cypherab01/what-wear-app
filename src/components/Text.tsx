import React from 'react';
import {Text as RNText, TextStyle, StyleSheet} from 'react-native';

interface TextProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Font size options
  weight?: 'light' | 'normal' | 'medium' | 'bold'; // Font weight options
  color?: string; // Accepts color codes like HEX, RGB, or color names
  style?: TextStyle; // Additional styles for flexibility
}

const CText: React.FC<TextProps> = ({
  children,
  size = 'md',
  weight = 'normal',
  color = '#333333', // Default text color
  style = {},
}) => {
  const sizeStyles: {[key in 'sm' | 'md' | 'lg' | 'xl']: TextStyle} = {
    sm: {fontSize: 12},
    md: {fontSize: 16},
    lg: {fontSize: 20},
    xl: {fontSize: 24},
  };

  const weightStyles: {
    [key in 'light' | 'normal' | 'medium' | 'bold']: TextStyle;
  } = {
    light: {fontWeight: '300'},
    normal: {fontWeight: '400'},
    medium: {fontWeight: '500'},
    bold: {fontWeight: '700'},
  };

  return (
    <RNText
      style={[
        sizeStyles[size],
        weightStyles[weight],
        {color, fontFamily: 'Raleway'},
        style,
      ]}>
      {children}
    </RNText>
  );
};

export default CText;
