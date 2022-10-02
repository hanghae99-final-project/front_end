import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const __getTodoList = createAsyncThunk("todoSlice/__getTodoList", async () => {
  const now = new Date();
  const year = now.getFullYear();
  const months = ("0" + (now.getMonth() + 1)).slice(-2);
  const days = ("0" + now.getDate()).slice(-2);

  const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/todo/${year}-${months}-${days}`, {
    headers: { Authorization: `Bearer ${localStorage.token}` }
  });
  return response.data;
});

export const __getDailyTodo = createAsyncThunk("todoSlice/__getDailyTodo", async payload => {
  const selectedMonth = payload.month < 10 ? "0" + payload.month : payload.month;
  const selectedDate = payload.date < 10 ? "0" + payload.date : payload.date;

  const response = await axios.get(
    process.env.REACT_APP_SERVER_URL + `/todo/${payload.year}-${selectedMonth}-${selectedDate}`,

    {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    }
  );
  return response.data;
});

export const __addTodo = createAsyncThunk("todoSlice/__addTodo", async todo => {
  const response = await axios.post(process.env.REACT_APP_SERVER_URL + `/todo`, todo, {
    headers: { Authorization: `Bearer ${localStorage.token}` }
  });
  return response.data;
});

export const __deleteTodo = createAsyncThunk("todoSlice/__deleteTodo", async todoId => {
  await axios.delete(process.env.REACT_APP_SERVER_URL + `/todo/${todoId}`, {
    headers: { Authorization: `Bearer ${localStorage.token}` }
  });
  return todoId;
});

export const __updateTodo = createAsyncThunk("todoSlice/__updateTodo", async payload => {
  const response = await axios.put(process.env.REACT_APP_SERVER_URL + `/todo/${payload.todoId}`, payload.upDateTodo, {
    headers: { Authorization: `Bearer ${localStorage.token}` }
  });
  return response.data;
});

export const __updateTodoDone = createAsyncThunk("todoSlice/__updateTodoDone", async ({ id, isDone }) => {
  const response = await axios.put(
    process.env.REACT_APP_SERVER_URL + `/todo/${id}`,
    {
      isDone: isDone
    },
    { headers: { Authorization: `Bearer ${localStorage.token}` } }
  );
  return response.data;
});

const todoSlice = createSlice({
  name: "todoList",
  initialState: [],
  reducers: {},
  extraReducers: {
    [__getTodoList.fulfilled]: (state, { payload }) => {
      return (state = payload.todoArr);
    },

    [__getDailyTodo.fulfilled]: (state, { payload }) => (state = payload.todoArr),
    [__getDailyTodo.rejected]: (state, { payload }) => {
      console.log("실패");
    },
    [__addTodo.fulfilled]: (state, { payload }) => {
      return (state = [...state, payload]);
    },
    [__deleteTodo.fulfilled]: (state, { payload }) => state.filter(toDo => toDo._id !== payload),

    [__updateTodo.fulfilled]: (state, { payload }) => {
      return current(state).map(todo => (todo._id === payload._id ? { ...todo, ...payload } : todo));
    },

    [__updateTodoDone.fulfilled]: (state, { payload }) => {
      return state.map(todo => {
        if (todo._id === payload._id) {
          return { ...todo, isDone: payload.isDone };
        } else {
          return todo;
        }
      });
    }
  }
});

export default todoSlice;
