import Todo from './Todo';
import { render, fireEvent } from '@testing-library/react';

describe('Todo rendering', () => {
    it('It should render TODO properly', () => {
       const {getByText} = render(<Todo id="123" text="testing todo" isComplete={false} removeTodo={jest.fn()} completeTodo={jest.fn()} />)
       expect(getByText('testing todo')).toBeDefined();
    })
})

describe('Todo actions', () => {
  it('When the user clicks on the remove icon should call removeTodo function', () => {
    const removeTodo = jest.fn();
    const { getByTestId } = render(<Todo id="123" text="testing todo" isComplete={false} removeTodo={removeTodo} completeTodo={jest.fn()} />)
    const btnRemoveTodo = getByTestId('remove-todo');
    fireEvent.click(btnRemoveTodo);
    expect(removeTodo).toHaveBeenCalled();
 })

  it('When the user clicks on the complete icon should call completeTodo function if todo is not completed', () => {
    const completeTodo = jest.fn();
    const { getByTestId } = render(<Todo id="123" text="testing todo" isComplete={false} removeTodo={jest.fn()} completeTodo={completeTodo} />)
    const btnRemoveTodo = getByTestId('complete-todo');
    fireEvent.click(btnRemoveTodo);
    expect(completeTodo).toHaveBeenCalled();
  })

  it('When the user clicks on the complete icon should not call completeTodo function if todo is completed', () => {
    const completeTodo = jest.fn();
    const { getByTestId } = render(<Todo id="123" text="testing todo" isComplete={true} removeTodo={jest.fn()} completeTodo={completeTodo} />)
    const btnRemoveTodo = getByTestId('complete-todo');
    fireEvent.click(btnRemoveTodo);
    expect(completeTodo).not.toHaveBeenCalled();
  })
})