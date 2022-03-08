
import { useState, useEffect } from 'react';
import TodoForm from '../components/todoForm/TodoForm';
import TodoList from '../components/todoList/TodoList';
import TodoService from '../services/TodoService';
import TodoModel from '../model/Todo';
import TodoListModel from '../model/TodoList'
import { Title } from './Home.styles'

function App() { 
   
  const [allTodos, setAllTodos] = useState<TodoListModel>();  
  const todoServices = new TodoService();

  const getData = async () => { 
    const todos = await todoServices.getCollection();
    if(todos){
      const sortTodos = todos.sort((a :TodoModel, b: TodoModel) => +a.isComplete - +b.isComplete);
      setAllTodos(new TodoListModel(sortTodos));
    }    
  }

  const addNewTodo = async (todoTitle: string) : Promise<boolean> => {    
      const mountTodo = { text: todoTitle, isComplete: false};
      const id = await todoServices.setNewTodo(mountTodo);        
      if(id.length > 0){
        const newTodo = new TodoModel(id, todoTitle, false);                
        setAllTodos(allTodos?.addTodo(newTodo));              
      }
      return id.length > 0;
  }

  const removeTodo = async (currentId: string) => {    
    const removed = await todoServices.removeTodoFromDd(currentId);
    removed  && setAllTodos(allTodos?.removeTodo(currentId));    
  }

  const completeTodo = async(currentTodo: TodoModel) => {
    if(await todoServices.completeTodo(currentTodo.id)){
      setAllTodos(allTodos?.completeTodo(currentTodo));
    }
  }
  
  useEffect(() => {
    getData();
  }, [])
  
  return (  
    <>
      <Title>
        <h1>ANOTHER</h1>
        <span>TODO - LIST</span>
      </Title>
      <TodoForm handleAddTodo={addNewTodo}/>    
      <TodoList todos={allTodos} completeTodo={completeTodo} removeTodo={removeTodo}/>
    </>
  )
}

export default App
