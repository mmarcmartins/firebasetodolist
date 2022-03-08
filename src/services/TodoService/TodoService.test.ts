
import TodoService from './index';
import { handlePromise } from '../../utils';
import data from './rawData';
import resultData from './formattedData.json';
import Todo from '../../model/Todo';

jest.mock('../../utils')
jest.mock('firebase/firestore/lite');

describe('Testing TodoService', () => {
    beforeAll(() => {
        jest.spyOn(window, 'alert').mockImplementation(jest.fn());
    })
    describe('Get Collection', () => {
        it('Should retrieve all todos from database', async () => {
            (handlePromise as jest.Mock).mockImplementation(() => Promise.resolve([{docs: data}, null]));
            const service = new TodoService();
            const serviceResult = await service.getCollection();
            const todoToJson = serviceResult.map((todo: Todo) => todo.toObject());        
            expect(todoToJson).toStrictEqual(resultData);
        })
        it('Should fail not retrieve all todos from database', async () => {        
            (handlePromise as jest.Mock).mockImplementation(() => Promise.resolve([null,"Error"]));
            const service = new TodoService();
            const serviceResult = await service.getCollection();        
            expect(serviceResult).toEqual([])  
        })
    })
    describe('setNewTodo', () => {
        it('Should be able to retrieve id from new todo inserted', async () => {
            const newId = '45';
            (handlePromise as jest.Mock).mockImplementation(() => Promise.resolve([{id: newId}, null]));
            const service = new TodoService();
            const serviceResult = await service.setNewTodo({ text: 'test', isComplete: false});                 
            expect(serviceResult).toStrictEqual(newId);
        })

        it('Should not be able to retrieve id from new todo inserted', async () => {            
            (handlePromise as jest.Mock).mockImplementation(() => Promise.resolve([null, "Error"]));
            const service = new TodoService();
            const serviceResult = await service.setNewTodo({ text: 'test', isComplete: false});                 
            expect(serviceResult).toStrictEqual('');
        })
    })
    describe('removeTodo', () => {
        it('Should be able to remove selectedTodo', async () => {            
            (handlePromise as jest.Mock).mockImplementation(() => Promise.resolve([true, null]));
            const service = new TodoService();
            const serviceResult = await service.removeTodoFromDd('randomId');                 
            expect(serviceResult).toStrictEqual(true);
        })

        it('Should not be able to remove selectedTodo', async () => {            
            (handlePromise as jest.Mock).mockResolvedValue([null, "Error"]);
            const service = new TodoService();
            const serviceResult = await service.removeTodoFromDd('randomId');                 
            expect(serviceResult).toStrictEqual("Error");
        })
    })

    describe('completeTodo', () => {
        it('Should be able to complete a todo', async () => {            
            (handlePromise as jest.Mock).mockImplementation(() => Promise.resolve([true, null]));
            const service = new TodoService();
            const serviceResult = await service.completeTodo('randomId');                 
            expect(serviceResult).toStrictEqual(true);
        })

        it('Should not be able to complete a todo', async () => {            
            (handlePromise as jest.Mock).mockImplementation(() => Promise.resolve([null,"Error"]));
            const service = new TodoService();
            const serviceResult = await service.completeTodo('randomId');                 
            expect(serviceResult).toStrictEqual("Error");
        })
    })
})