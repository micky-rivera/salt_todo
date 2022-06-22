import { createSlice } from "@reduxjs/toolkit";

const initialState: AppState = {
    todoList: {
        id: '',
        title: '',
        content: []
    },
}

export const appSlice = createSlice({
  name: "appReducer",
  initialState,
  reducers: {
    setList: (state, action) => {
      return {
        todoList: action.payload
      };
    },
    addTodo: (state, action) => {
      return {
        todoList: {
            id: state.todoList.id,
            title: state.todoList.title,
            content: [...state.todoList.content, action.payload]
        }
      };
    },
  },
});

export const {
  setList,
  addTodo,
} = appSlice.actions;
export default appSlice.reducer;