import TodoList from './TodoList';
import { render } from '@testing-library/react';
import TodoModel from '../../model/Todo';
import TodoListModel from '../../model/TodoList';

const allTodos = [
    new TodoModel('1', 'Testando 1',false),
    new TodoModel('2', 'Testando 2', false),
    new TodoModel('3', 'Testando 3', true)
];

const list = new TodoListModel(allTodos);

describe('TodoList rendering', () => {
    it('It should render TodoList properly', () => {
       const { getByText } = render(<TodoList todos={list} removeTodo={jest.fn()} completeTodo={jest.fn()} />)
       expect(getByText('Testando 1')).toBeDefined();
       expect(getByText('Testando 2')).toBeDefined();
       expect(getByText('Testando 3')).toBeDefined();
    })
})