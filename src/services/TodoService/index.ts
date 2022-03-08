import { collection, getDocs, addDoc,deleteDoc,doc, DocumentData, CollectionReference, updateDoc} from 'firebase/firestore/lite';
import TodoModel from "../../model/Todo";
import database from '../../config/FirebaseConfig';
import { handlePromise } from "../../utils";
import { TodoInterfacePreview } from './TodoService';


export default class TodoService{
  #todosCol: CollectionReference<DocumentData>;

  constructor(){
    this.#todosCol = collection(database, 'todo')
  }

  async getCollection(){  
      
    const [result, error] = await handlePromise(getDocs(collection(database, 'todo')))   
    if(error){      
      alert(`There was an error getting the todos : ${error}`)   
      return [];
    }  
    return result.docs.map((doc:DocumentData) => (TodoModel.toModel({ id: doc.id ,...doc.data()})));
  }

  async setNewTodo(todo: TodoInterfacePreview): Promise<string>{
    const [result, error] = await handlePromise(addDoc(this.#todosCol, todo))    
    if(error){      
      alert(`There was an error adding a new todo: ${error}`)   
      return '';
    }
  
    return result.id;
  }

  async removeTodoFromDd(id: string) : Promise<boolean>{
    const [_, error] = await handlePromise(deleteDoc(doc(this.#todosCol,id)))    
    if(error){
      alert(`There was an error deleting: ${error}`)
      return error;    
    }     
    return true;
  }

  async completeTodo(id: string) : Promise<boolean>{
    const ref = doc(this.#todosCol,id);
    const [_, error] = await handlePromise(updateDoc(ref, { isComplete: true }));
    if(error){
      alert(`There was an error while completing the todo: ${error}`)       
      return error;
    }
    return true;
  }
  
}  