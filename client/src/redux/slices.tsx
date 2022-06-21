import { createSlice } from "@reduxjs/toolkit";

const initialState: AppState = {
    todoList: [],
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
        todoList: [...state.todoList, action.payload]
      };
    },
  },
});

export const {
  setList,
  addTodo,
} = appSlice.actions;
export default appSlice.reducer;