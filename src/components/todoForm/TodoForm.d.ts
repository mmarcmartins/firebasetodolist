export interface TodoFormProps {
    handleAddTodo: (text: string) => Promise<boolean>;
}