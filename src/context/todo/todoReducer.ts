import { Actions, TodoActionsType } from '../types';
import { TodoType } from '../../../App';

export type TodoReducerType = {
  todos: TodoType[]
  loading: boolean
  error: null | string
}
export const todoReducer = (state: TodoReducerType, action: TodoActionsType): TodoReducerType => {
  switch (action.type) {
    case Actions.ADD_TODO:
      return {
        ...state, todos: [
          ...state.todos, {
            id: action.id,
            title: action.title
          }
        ]
      };
    case Actions.REMOVE_TODO:
      return {...state, todos: state.todos.filter(todo => todo.id !== action.id)};
    case Actions.UPDATE_TODO:
      return {
        ...state, todos: state.todos.map(todo =>
          todo.id === action.id
            ? {...todo, title: action.title}
            : todo)
      };
    case Actions.FETCH_TODOS:
      return {...state, todos: action.todos};
    case Actions.SHOW_LOADER:
      return {...state, loading: true};
    case Actions.HIDE_LOADER:
      return {...state, loading: false};
    case Actions.SHOW_ERROR:
      return {...state, error: action.error};
    case Actions.CLEAR_ERROR:
      return {...state, error: null};
    default:
      return state;
  }
};