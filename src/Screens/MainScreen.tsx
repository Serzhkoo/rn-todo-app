import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { Todo } from '../components/Todo';
import { AddTodo } from '../components/AddTodo';
import { THEME } from '../theme';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';
import { AppLoader } from '../components/ui/AppLoader';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';

export const MainScreen: React.FC = () => {
  const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext);
  const {changeScreen} = useContext(ScreenContext);
  const [deviceWidth, setDeviceWidth] = useState<number>(Dimensions.get('window').width - 2 * THEME.PADDING_HORIZONTAL);

  const loadTodos = useCallback(async () => {
    await fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - 2 * THEME.PADDING_HORIZONTAL;
      setDeviceWidth(width);
    };
    Dimensions.addEventListener('change', update);
    return () => Dimensions.removeEventListener('change', update);
  }, []);

  if (loading) {
    return (
      <AppLoader />
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>
          {error}
        </AppText>
        <AppButton onPress={loadTodos}>Retry</AppButton>
      </View>
    );
  }

  let content = (
    <View style={{width: deviceWidth}}>
      <FlatList
        keyExtractor={item => item.id}
        data={todos}
        renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />}
      />
    </View>
  );
  if (!todos.length) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          source={require('../../assets/no-items.png')}
          style={styles.img}
        />
      </View>
    );
  }

  return (
    <>
      <AddTodo onSubmit={addTodo} />
      {content}
    </>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR
  }
});
