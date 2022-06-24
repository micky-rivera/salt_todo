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
        setTodoLists: React.Dispatch<React.SetStateAction<HomepageTodoList[]>>,
        todoLists: {
            id: string,
            title: string
        }[],
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