import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, View, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { THEME } from '../theme';

type AddTodoPropsType = {
  onSubmit: (title: string) => void
}

export const AddTodo: React.FC<AddTodoPropsType> = (props) => {
  const [value, setValue] = useState<string>('');
  const {onSubmit} = props;

  const pressHandler = () => {
    if (value.trim().length > 2) {
      onSubmit(value.trim());
      setValue('');
      Keyboard.dismiss();
    } else {
      Alert.alert(`The minimum title length is 3 characters. Now it is ${value.trim().length} characters.`);
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={'Enter todo title...'}
      />
      <AntDesign.Button name={'plus'} onPress={pressHandler}>Add</AntDesign.Button>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  input: {
    width: '70%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR
  }
});