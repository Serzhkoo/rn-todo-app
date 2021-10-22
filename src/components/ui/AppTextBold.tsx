import React from 'react';
import { Text, StyleSheet } from 'react-native';

type AppTextBoldPropsType = {
  style?: {
    [key: string]: number | string
  }
}

export const AppTextBold: React.FC<AppTextBoldPropsType> = (props) => {
  const {style, children} = props;

  return (
    <Text style={{...styles.default, ...style}}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: 'roboto-bold'
  }
});
