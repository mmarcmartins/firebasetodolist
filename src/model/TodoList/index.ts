import Todo from "../Todo";

export default class TodoList {
    #todoList: Todo[];
    
    constructor(todoList: Todo[]){
        this.#todoList = todoList;
    }    

    get list() : Todo[]{
        return this.#todoList;
    }

    removeTodo(id: string) : TodoList{
        const removed = this.#todoList.filter(todo => todo.id !== id)        
        return new TodoList(removed);
    }

    addTodo(todo: Todo) : TodoList{                   
        return new TodoList([todo, ...this.#todoList]);
    }
    
    completeTodo({ id, text }: Todo) : TodoList {        
        const filterCurrentTodo = this.#todoList.filter(todo => todo.id !== id);        
        return new TodoList([...filterCurrentTodo, new Todo(id,text,true) ]);
    }
}