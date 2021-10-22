import { TodoType } from '../../App';

export enum Actions {
  ADD_TODO = 'ADD_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  CHANGE_SCREEN = 'CHANGE_SCREEN',
  FETCH_TODOS = 'FETCH_TODOS',
  SHOW_LOADER = 'SHOW_LOADER',
  HIDE_LOADER = 'HIDE_LOADER',
  SHOW_ERROR = 'SHOW_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR'
}

export const addTodoAC = (id: string, title: string) => {
  return {type: Actions.ADD_TODO, id, title} as const;
};
export const updateTodoAC = (title: string, id: string) => {
  return {type: Actions.UPDATE_TODO, title, id} as const;
};
export const removeTodoAC = (id: string) => {
  return {type: Actions.REMOVE_TODO, id} as const;
};
export const changeScreenAC = (id: string) => {
  return {type: Actions.CHANGE_SCREEN, id} as const;
};
export const fetchTodosAC = (todos: TodoType[]) => {
  return {type: Actions.FETCH_TODOS, todos} as const;
};
export const showLoaderAC = () => {
  return {type: Actions.SHOW_LOADER} as const;
};
export const hideLoaderAC = () => {
  return {type: Actions.HIDE_LOADER} as const;
};
export const showErrorAC = (error: string) => {
  return {type: Actions.SHOW_ERROR, error} as const;
};
export const clearErrorAC = () => {
  return {type: Actions.CLEAR_ERROR} as const;
};

export type TodoActionsType =
  ReturnType<typeof addTodoAC>
  | ReturnType<typeof updateTodoAC>
  | ReturnType<typeof removeTodoAC>
  | ReturnType<typeof showLoaderAC>
  | ReturnType<typeof hideLoaderAC>
  | ReturnType<typeof showErrorAC>
  | ReturnType<typeof clearErrorAC>
  | ReturnType<typeof fetchTodosAC>

export type ScreenActionsType = ReturnType<typeof changeScreenAC>
