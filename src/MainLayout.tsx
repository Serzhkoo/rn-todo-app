import React, { useContext } from 'react';
import { NavBar } from './components/NavBar';
import { StyleSheet, View } from 'react-native';
import { THEME } from './theme';
import { MainScreen } from './Screens/MainScreen';
import { TodoScreen } from './Screens/TodoScreen';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout: React.FC = () => {
  const {todoId} = useContext(ScreenContext);

  return (
    <View style={styles.wrapper}>
      <NavBar title={'Todo'} />
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
    flex: 1
  },
  wrapper: {
    flex: 1
  }
});
