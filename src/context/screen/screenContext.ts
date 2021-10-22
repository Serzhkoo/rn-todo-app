import { createContext } from 'react';

export type ScreenContextType = {
  todoId: string,
  changeScreen: (id: string) => void
}

export const ScreenContext = createContext<ScreenContextType>({} as ScreenContextType);