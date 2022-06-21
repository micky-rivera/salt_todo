export default {}

declare global {
    interface TodoItemProps {
        todo: TodoItem
    }
    type AppState = {
        todoList: TodoItem[]
    }
}