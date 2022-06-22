export default {}

declare global {
    interface HomepageFormProps {
        setTodoLists: React.Dispatch<React.SetStateAction<HomepageTodoList[]>>
    }
    type HomepageTodoList = {
        id: string,
        title: string
    }
    interface TodoListCardProps {
        todoList: {
            id: string,
            title: string
        }
    }
    interface TodoItemProps {
        todo: TodoItem
    }
    type AppState = {
        todoList: {
            id: string,
            title: string,
            content: TodoItem[]
        }
    }
}