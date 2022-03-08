import TodoListModel from '../../model/TodoList'
import TodoModel from '../../model/Todo';

export interface TodoListProps {
    todos?: TodoListModel,
    removeTodo: (id: string) => void;
    completeTodo: (currentTodo: TodoModel) => void;
}