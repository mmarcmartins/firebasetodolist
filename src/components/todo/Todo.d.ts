import TodoModel from '../../model/Todo';
export interface TodoStyleProps {
    isComplete: boolean;
}

interface TodoProps {
    id: string;
    text: string;
    isComplete: boolean;
    removeTodo: (id: string) => void;
    completeTodo: (currentTodo: TodoModel) => void;
  }