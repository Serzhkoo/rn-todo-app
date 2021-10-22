import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Modal, Text, Alert } from 'react-native';
import { THEME } from '../theme';
import { AppButton } from './ui/AppButton';

type EditModalPropsType = {
  visible: boolean
  onCancel: () => void
  value: string
  onSave: (title: string) => void
}

export const EditModal: React.FC<EditModalPropsType> = (props) => {
  const {visible, onCancel, value, onSave} = props;
  const [title, setTitle] = useState<string>(value);

  const onCancelPress = () => {
    setTitle(value);
    onCancel();
  };
  const onSavePress = () => {
    if (title.trim().length < 3) {
      Alert.alert('Error!', `The minimum title length is 3 characters. Now it is ${title.trim().length} characters.`);
    } else {
      onSave(title);
    }
  };

  return (
    <Modal visible={visible} animationType={'slide'} transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder={'Enter title...'}
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={64}
        />
        <View style={styles.buttons}>
          <AppButton onPress={onCancelPress} color={THEME.DANGER_COLOR}>
            Cancel
          </AppButton>
          <AppButton onPress={onSavePress}>
            Save
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%'
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
