import TodoListModel from './index';
import TodoModel from '../Todo';

const defaultTodos = [
    new TodoModel('1', 'test 1', false),
    new TodoModel('2', 'test 2', false),
    new TodoModel('3', 'test 3', true)
]

const toObject = (todo: TodoModel) => todo.toObject();

const defaultTodosObject = [...defaultTodos.map(toObject)];


describe('Testing TodoList model', () => {
    let todoList : TodoListModel;
    beforeEach(() => {
        todoList = new TodoListModel(defaultTodos);
    })

    it('Should be able to add a new todo on the top of the list', () => {
        const newTodo = new TodoModel('25', 'testing add', false);
        const newList = todoList.addTodo(newTodo);
        const newListObj = newList.list.map(toObject);
        const expected = [newTodo.toObject(), ...defaultTodosObject];

        expect(newListObj).toStrictEqual(expected)
    })

    it('Should be able to remove a selected Todo', () => {
        const newList = todoList.removeTodo('1');
        const newListObj = newList.list.map(toObject);
        const expected = [defaultTodosObject[1], defaultTodosObject[2]];
        
        expect(newListObj).toStrictEqual(expected);
    })

    it('Should be able to complete a selected Todo and be move to the bottom of the list', () => {
        const newList = todoList.completeTodo(defaultTodos[0]);
        const newListObj = newList.list.map(toObject);
        const expected = [defaultTodosObject[1], defaultTodosObject[2], {... defaultTodosObject[0], isComplete: true}];
        
        expect(newListObj).toStrictEqual(expected);
    })

})