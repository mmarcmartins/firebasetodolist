import React, { useState } from "react";
import { StyledForm } from './TodoForm.styles'
import { TodoFormProps } from './TodoForm.d';

const TodoForm = ({handleAddTodo}: TodoFormProps) => {
  const [todo, setTodo] = useState('');

  const addTodo = async () => {
      if(todo === '') return;
      if(await handleAddTodo(todo)){
        setTodo('')
      }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.key === 'Enter' && addTodo();
  }
  
  const handleSetTodo = () => addTodo();

  return (
    <StyledForm>
        <div className="input-styled">
          <input  data-testid="todoform-input" value={todo} placeholder="ADD NEW TODO" onKeyPress={handleKeyPress} onChange={(event) => setTodo(event.target.value)}/>
          <button data-testid="todoform-insert-btn" onClick={handleSetTodo} className="mobile-addtodo-button">Press me to add a new TODO</button>
        </div>        
    </StyledForm>
  )
}

export default TodoForm