import React, { useReducer } from 'react';
import { ScreenContext } from './screenContext';
import { screenReducer, ScreenReducerType } from './screenReducer';
import { changeScreenAC } from '../types';

export const ScreenState: React.FC = (props) => {
  const {children} = props;
  const initialState: ScreenReducerType = {
    id: ''
  };
  const [state, dispatch] = useReducer(screenReducer, initialState);

  const changeScreen = (id: string) => {
    dispatch(changeScreenAC(id));
  };

  return (
    <ScreenContext.Provider
      value={{
        todoId: state.id,
        changeScreen
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};