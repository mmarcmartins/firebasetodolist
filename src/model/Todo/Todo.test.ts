import TodoModel from './index';
const objTodo = {
    id: '1',
    text: 'testing',
    isComplete: false
}
describe('Todo model', () => {
    it('Should return an object as model', () => {
      const NewModel = TodoModel.toModel(objTodo as TodoModel);
      expect(NewModel.id).toBe('1');
      expect(NewModel.text).toBe('testing');
      expect(NewModel.isComplete).toBe(false);
    })
    it('Should return a model as object', () => {
        const defaultTodo = new TodoModel('1','testing', false);
        expect(defaultTodo.toObject()).toEqual(objTodo);
    })
})