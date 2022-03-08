import FlipMove from 'react-flip-move';
import TodoModel from '../../model/Todo';
import Todo from '../todo/Todo';
import { TodoListStyled, TodoListContainer } from './TodoList.styles';
import { TodoListProps } from './TodoList.d';

const TodoList = ({todos, removeTodo, completeTodo} : TodoListProps) => {     
  return (    
    <TodoListContainer data-testid="todo-list">
      <TodoListStyled>
        <FlipMove>
        {
          todos?.list.map(({id, text, isComplete} : TodoModel) => (
            <Todo id={id} text={text} key={id} isComplete={isComplete} removeTodo={removeTodo} completeTodo={completeTodo}/>
          ))
        }
        </FlipMove>
      </TodoListStyled>  
    </TodoListContainer>     
  )
}

export default TodoList;
