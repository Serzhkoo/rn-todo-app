import React from 'react';
import { Text, StyleSheet } from 'react-native';

type AppTextPropsType = {
  style?: {
    [key: string]: number | string
  }
}

export const AppText: React.FC<AppTextPropsType> = (props) => {
  const {style, children} = props;

  return (
    <Text style={{...styles.default, ...style}}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: 'roboto-regular'
  }
});
