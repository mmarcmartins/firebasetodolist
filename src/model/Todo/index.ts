export default class Todo {
    #id : string;
    #text: string;
    #isComplete: boolean;
    
    constructor(id: string, text: string, isComplete: boolean){
        this.#id = id;
        this.#text = text;
        this.#isComplete = isComplete;
    }

    get id(){
        return this.#id;
    }
    get text(){
        return this.#text;
    }
    get isComplete(){
        return this.#isComplete;
    }

    static toModel(objTodo: Todo){        
        return new Todo(objTodo.id, objTodo.text, objTodo.isComplete)
    }
    toObject(){
        return {
            id: this.#id,
            text: this.#text,
            isComplete: this.#isComplete
        };
    }
}