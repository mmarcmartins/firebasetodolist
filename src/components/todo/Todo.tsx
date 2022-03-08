import { TodoStyled, TodoActions} from './Todo.styles';
import { MdDone, MdOutlineClose } from 'react-icons/md';
import { forwardRef } from 'react';
import TodoModel from '../../model/Todo';
import { TodoProps } from './Todo.d';

const Todo = forwardRef(({id,text,isComplete,removeTodo,completeTodo}: TodoProps, ref) => { 
 
  const checkCompleteTodo = () => {
    !isComplete && completeTodo(new TodoModel(id,text,isComplete));
  }

  return (      
    <TodoStyled key={id} isComplete={isComplete} ref={ref}>
      <span data-testid="todo-title">
        {text}
      </span>
      <TodoActions isComplete={isComplete}>
        <button className="remove" data-testid="remove-todo" onClick={() => removeTodo(id)}>
          <MdOutlineClose/>
        </button>
        <button className="complete" data-testid="complete-todo" onClick={checkCompleteTodo}>
          <MdDone/>
        </button>
      </TodoActions>
    </TodoStyled>                      
  )
});

export default Todo;
