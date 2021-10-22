import { createContext } from 'react';
import { TodoType } from '../../../App';

type TodoContextType = {
  todos: TodoType[]
  addTodo: (title: string) => void
  removeTodo: (id: string) => void
  updateTodo: (title: string, id: string) => void
  fetchTodos: () => void
  loading: boolean,
  error: null | string
}

export const TodoContext = createContext<TodoContextType>({} as TodoContextType)
