import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import { THEME } from '../theme';
import { AppTextBold } from './ui/AppTextBold';

type NavBarPropsType = {
  title: string
}

export const NavBar: React.FC<NavBarPropsType> = (props) => {
  const {title} = props;

  return (
    <View style={{
      ...styles.navbar, ...Platform.select<{ [key: string]: string | number }>({
        android: styles.navbarAndroid,
        ios: styles.navbarIos
      })
    }}>
      <AppTextBold style={styles.text}>{title}</AppTextBold>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR
  },
  navbarIos: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1
  },
  text: {
    color: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff',
    fontSize: 20
  }
});