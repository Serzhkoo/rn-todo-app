import React, { useContext, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { TodoType } from '../../App';
import { THEME } from '../theme';
import { AppCard } from '../components/ui/AppCard';
import { EditModal } from '../components/EditModal';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppButton } from '../components/ui/AppButton';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';

export const TodoScreen: React.FC = () => {
  const {todos, removeTodo, updateTodo} = useContext(TodoContext);
  const {todoId, changeScreen} = useContext(ScreenContext);
  const [modal, setModal] = useState<boolean>(false);

  const selectedTodo = todos.find(todo => todo.id === todoId);
  const todo = selectedTodo ? selectedTodo : {} as TodoType;

  const goBack = () => {
    changeScreen('');
  };

  const onRemovePressHandler = () => {
    removeTodo(todo.id);
  };
  const onEditPress = () => {
    setModal(true);
  };
  const onCancelPress = () => {
    setModal(false);
  };
  const onSavePress = async (title: string) => {
    await updateTodo(title, todo.id);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        visible={modal}
        onCancel={onCancelPress}
        value={todo.title}
        onSave={onSavePress}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={onEditPress}>
          <FontAwesome name={'edit'} size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton color={THEME.GREY_COLOR} onPress={goBack}>
            <AntDesign name={'back'} size={20} color={'#fff'} />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton color={THEME.DANGER_COLOR} onPress={onRemovePressHandler}>
            <FontAwesome name={'remove'} size={20} color={'#fff'} />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    marginBottom: 20,
    padding: 15
  },
  button: {
    width: Dimensions.get('window').width * 0.35
  },
  title: {
    fontSize: 20
  }
});
