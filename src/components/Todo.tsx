import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TodoType } from '../../App';
import { AppText } from './ui/AppText';

type TodoPropsType = {
  todo: TodoType
  onRemove: (id: string) => void
  onOpen: (id: string) => void
}

export const Todo: React.FC<TodoPropsType> = (props) => {
  const {todo, onRemove, onOpen} = props;

  const longPressHandler = () => {
    onRemove(todo.id);
  };
  const pressHandler = () => {
    onOpen(todo.id);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onLongPress={longPressHandler}
      onPress={pressHandler}
    >
      <View style={styles.todo}>
        <AppText>{todo.title}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10
  }
});