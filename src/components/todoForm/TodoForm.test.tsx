import TodoForm from './TodoForm';
import { act, render, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe('TodoForm rendering', () => {
    it('It should render TodoForm properly', () => {
       const { getByTestId } = render(<TodoForm handleAddTodo={jest.fn()} />)
       expect(getByTestId("todoform-input")).toBeDefined();
       expect(getByTestId("todoform-insert-btn")).toBeDefined();
    })
})

describe('TodoForm actions', () => {
    describe('Input is not empty',() => {        

        it('It should clear the input when the enter key is pressed', async () => {
            const handleAddTodo = jest.fn().mockReturnValue(true);
            const { getByTestId } = render(<TodoForm handleAddTodo={handleAddTodo} />)

            const inputForm = getByTestId("todoform-input");
            const buttonForm = getByTestId( "todoform-insert-btn");

            userEvent.type(inputForm, "New todo");
            await act(async () => {
                await userEvent.click(buttonForm);
            })

            expect(inputForm.getAttribute('value')).toBe('');
        })

        it('It should clear the input when the enter button is pressed', async () => {
            const handleAddTodo = jest.fn().mockReturnValue(true);
            const { getByTestId } = render(<TodoForm handleAddTodo={handleAddTodo} />)
            
            const inputForm = getByTestId("todoform-input");
            userEvent.type(inputForm, "New todo");
            inputForm.focus();

            await act(async () => {
                await userEvent.keyboard('{Enter}');
            })
            expect(inputForm.getAttribute('value')).toBe('');
        })

        it('It should not clear the input if handleTodo failed', async () => {
            const handleAddTodo = jest.fn().mockResolvedValue(false);
            const { getByTestId } = render(<TodoForm handleAddTodo={handleAddTodo} />)
            
            const inputForm = getByTestId("todoform-input");
            userEvent.type(inputForm, "New todo");
            inputForm.focus();

            await act(async () => {
                await userEvent.keyboard('{Enter}');
            })
            expect(inputForm.getAttribute('value')).toBe('New todo');
        })
    })

    describe('Input is empty',() => {
        let currentContainer : HTMLElement;
        const handleAddTodo = jest.fn().mockReturnValue(false);

        beforeEach(() => {
            const { container } = render(<TodoForm handleAddTodo={handleAddTodo} />)
            currentContainer = container;
        });
        
        it('It should not clear the input when the add todo button is clicked', async () => {
            const inputForm = getByTestId(currentContainer, "todoform-input");
            const buttonForm = getByTestId(currentContainer, "todoform-insert-btn");
            await act(async () => {
                await userEvent.click(buttonForm);
            })
            expect(handleAddTodo).not.toHaveBeenCalled();
            expect(inputForm.getAttribute('value')).toBe('');
        })

        it('It should not clear the input when the enter key is pressed', async () => {
            const inputForm = getByTestId(currentContainer, "todoform-input");
            const buttonForm = getByTestId(currentContainer, "todoform-insert-btn");
            await act(async () => {
                await userEvent.click(buttonForm);
            })
            expect(handleAddTodo).not.toHaveBeenCalled();
            expect(inputForm.getAttribute('value')).toBe('');
        })
    })
})