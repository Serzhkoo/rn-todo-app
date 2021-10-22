import { Actions, ScreenActionsType } from '../types';

export type ScreenReducerType = {
  id: string
}

export const screenReducer = (state: ScreenReducerType, action: ScreenActionsType): ScreenReducerType => {
  switch (action.type) {
    case Actions.CHANGE_SCREEN:
      return {...state, id: action.id};
    default:
      return state;
  }
};