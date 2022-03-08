import Home from './Home';
import { act, waitFor, render, findByText, findAllByTestId, queryByText, getByTestId, queryAllByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import TodoModel from '../model/Todo';
import TodoService from '../services/TodoService';

jest.mock('react-flip-move', () => {
    const component = (props: { children: JSX.Element[] }) : JSX.Element => {        
        return <>{props.children}</>
    }
    return component;
})

jest.mock('../services/TodoService');

const allTodos = [
    new TodoModel('1', 'Testando 1',false),
    new TodoModel('2', 'Testando 2', false),
    new TodoModel('3', 'Testando 3', true)
];

describe('Home rendering', () => {

    beforeAll(() => {
        (TodoService as jest.Mock).mockReturnValue({
            getCollection: jest.fn().mockResolvedValue(allTodos)
        })
    })

    it('should render Home properly', async() => {
        const { getByText, getByTestId} = await render(<Home/>);
        expect(getByTestId('todoform-input')).toBeDefined();
        expect(getByTestId('todoform-insert-btn')).toBeDefined();
        
        await waitFor(() => {
            expect(getByText("Testando 1")).toBeDefined();
            expect(getByText("Testando 2")).toBeDefined();
            expect(getByText("Testando 3")).toBeDefined();
        })
    })
    it('should not render any todo', async () => {
        (TodoService as jest.Mock).mockReturnValue({
            getCollection: jest.fn().mockResolvedValue(undefined)
        })
        const { getByTestId, findByTestId, queryAllByTestId} = await render(<Home/>);
        expect(getByTestId('todoform-input')).toBeDefined();
        expect(getByTestId('todoform-insert-btn')).toBeDefined();
        expect(await findByTestId('todo-list')).toBeDefined();
        const allTodos = queryAllByTestId("todo-title");
        expect(allTodos.length).toBe(0);
    })
})

describe('Home actions success', () => {
    let outerWrapper : HTMLElement;

    beforeAll( () => {
        (TodoService as jest.Mock).mockReturnValue({
            getCollection: jest.fn().mockResolvedValue(allTodos),
            setNewTodo: jest.fn().mockResolvedValue('5'),
            removeTodoFromDd: jest.fn().mockResolvedValue(true),
            completeTodo: jest.fn().mockResolvedValue(true)
        })
    })

    beforeEach(async () => {
        const { container } = await render(<Home/>);
        await findByText(container, "Testando 1");
        outerWrapper = container
    })

    it('It should remove the selected todo', async () => {                   
        const removeButtons = await findAllByTestId(outerWrapper, "remove-todo");
        await act(async () => { await userEvent.click(removeButtons[0]) });
        expect(queryByText(outerWrapper, "Testando 1")).not.toBeTruthy()
    })

    it('It should complete the selected todo and move it to the bottom of the list', async () => {                   
        const completeButtons = await findAllByTestId(outerWrapper,"complete-todo");
        await act(async () => { await userEvent.click(completeButtons[0]) });
        const allTodos = queryAllByTestId(outerWrapper,"todo-title");
        expect(allTodos[allTodos.length - 1].textContent).toBe('Testando 1')
    })

    it('Should add a new todo on the top of the list', async () => {                   
        const inputForm = getByTestId(outerWrapper, "todoform-input");
        userEvent.type(inputForm, "New todo");
        inputForm.focus();

        await act(async () => {
            await userEvent.keyboard('{Enter}');
        })

        const allTodos = queryAllByTestId(outerWrapper, "todo-title");        
        expect(allTodos[0].textContent).toBe('New todo');
    })
})

describe('Home actions failures', () => {
    const getCollection = jest.fn().mockResolvedValue(allTodos);

    it('Should not remove the selected todo if removeTodoFromDd fail', async () => { 
        (TodoService as jest.Mock).mockReturnValue({
            getCollection,
            removeTodoFromDd: jest.fn().mockResolvedValue(false),
        })
        const { findAllByTestId, queryByText, findByText } = await render(<Home/>);
        await findByText("Testando 1");

        const removeButtons = await findAllByTestId("remove-todo");
        await act(async () => { await userEvent.click(removeButtons[0]) });
        expect(queryByText("Testando 1")).toBeTruthy()
    })

    it('Should not complete todo if todoComplete from services fail', async () => {  
        (TodoService as jest.Mock).mockReturnValue({
            getCollection,
            completeTodo: jest.fn().mockResolvedValue(false),
        }) 
        const { findAllByTestId, queryAllByTestId, findByText } = await render(<Home/>);
        await findByText("Testando 1");  

        const completeButtons = await findAllByTestId("complete-todo");
        await act(async () => { await userEvent.click(completeButtons[0]) });
        const allTodos = queryAllByTestId("todo-title");
        expect(allTodos[allTodos.length - 1].textContent).toBe('Testando 3')
    })

    it('Should not add a new todo if setNewTodo fail', async () => {   
        (TodoService as jest.Mock).mockReturnValue({
            getCollection,
            setNewTodo: jest.fn().mockResolvedValue(0),
        }) 
        const { getByTestId, queryAllByTestId, findByText } = await render(<Home/>);
        await findByText("Testando 1");                
        const inputForm = getByTestId("todoform-input");
        userEvent.type(inputForm, "New todo");
        inputForm.focus();

        await act(async () => {
            await userEvent.keyboard('{Enter}');
        })

        const allTodos = queryAllByTestId("todo-title");        
        expect(allTodos[0].textContent).toBe('Testando 1');
    })
})