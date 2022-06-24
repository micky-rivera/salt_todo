export default {}

declare global {
    interface TodoFormProps {
        socket: any
    }
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
        socket: any,
        todo: TodoItem
    }
    type AppState = {
        todoList: {
            id: string,
            title: string,
            content: TodoItem[]
        }
    }

    interface ServerToClientEvents {
        noArg: () => void;
        basicEmit: (a: number, b: string, c: Buffer) => void;
        withAck: (d: string, callback: (e: number) => void) => void;
      }
      
      interface ClientToServerEvents {
        hello: () => void;
      }
      
      interface InterServerEvents {
        ping: () => void;
      }
      
      interface SocketData {
        name: string;
        age: number;
      }
}