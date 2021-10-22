import React, { useContext, useReducer } from 'react';
import { TodoContext } from './todoContext';
import { todoReducer, TodoReducerType } from './todoReducer';
import { addTodoAC, clearErrorAC, fetchTodosAC, hideLoaderAC, removeTodoAC, showErrorAC, showLoaderAC, updateTodoAC } from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Alert } from 'react-native';
import { Http } from '../../http';

export const TodoState: React.FC = (props) => {
    const {children} = props;
    const {todoId, changeScreen} = useContext(ScreenContext);
    const initialState: TodoReducerType = {
      todos: [],
      loading: false,
      error: null
    };
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const fetchTodos = async () => {
      showLoader();
      clearError();
      try {
        const data = await Http.get('https://rn-todo-app-f1b18-default-rtdb.firebaseio.com/todos.json');
        const todos = Object.keys(data).map(key => {
          return {...data[key], id: key};
        });
        dispatch(fetchTodosAC(todos));
      } catch (error) {
        showError('Something wrong! Try again later...');
        console.log(error);
      } finally {
        hideLoader();
      }
    };

    const addTodo = async (title: string) => {
      clearError();
      try {
        const data = await Http.post('https://rn-todo-app-f1b18-default-rtdb.firebaseio.com/todos.json', {title});
        dispatch(addTodoAC(data.name, title));
      } catch (error) {
        showError('Something wrong! Try again later...');
      }
    };

    const removeTodo = (id: string) => {
      const selectedTodo = state.todos.find(todo => todo.id === todoId);
      Alert.alert(
        'Delete element',
        `Do you want to delete ${selectedTodo && selectedTodo.title}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Delete',
            onPress: async () => {
              changeScreen('');
              await Http.delete(`https://rn-todo-app-f1b18-default-rtdb.firebaseio.com/todos/${id}.json`);
              dispatch(removeTodoAC(id));
            },
            style: 'destructive'
          }
        ],
        {cancelable: false}
      );
    };

    const updateTodo = async (title: string, id: string) => {
      clearError();
      try {
        await Http.patch(`https://rn-todo-app-f1b18-default-rtdb.firebaseio.com/todos/${id}.json`, {title});
        dispatch(updateTodoAC(title, id));
      } catch (error) {
        showError('Something wrong! Try again later...');
        console.log(error);
      }
    };

    const showLoader = () => dispatch(showLoaderAC());

    const hideLoader = () => dispatch(hideLoaderAC());

    const showError = (error: string) => dispatch(showErrorAC(error));

    const clearError = () => dispatch(clearErrorAC());

    return (
      <TodoContext.Provider
        value={{
          todos: state.todos,
          loading: state.loading,
          error: state.error,
          addTodo, removeTodo, updateTodo, fetchTodos
        }}
      >
      {children}
    </TodoContext.Provider>
    );
  }
;
