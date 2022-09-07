import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

const now = new Date();
const year = now.getFullYear();
const months = ("0" + (now.getMonth() + 1)).slice(-2)
const days = ("0" + now.getDate()).slice(-2)
console.log(`${year}-${months}-${days}`)

export const getList = createAsyncThunk("GET_TODO", async () => {
  const response = await axios.get(`http://13.124.204.3/todo/${year}-${months}-${days}`);
  console.log(response)
  return response.data;
});

export const addList = createAsyncThunk("ADD_TODO", async (toDo) => {
  const response = await axios.post("http://13.124.204.3/todo", toDo);
  console.log(response)
  return response.data;
});

export const deleteList = createAsyncThunk("DELETE_TODO", async (toDoId) => {
  const response = await axios.delete(`http://13.124.204.3/todo/${toDoId}`);
  console.log(response)
  return toDoId;
});

export const updateList = createAsyncThunk(
  "UPDATE_LIST",
  async ({ id, work, color }) => {
    console.log(id)
    const response = await axios.put(`http://13.124.204.3/todo/${id}`, {
      work: work, color: color
    });
    console.log(response)
    return response.data;
  }
);

export const updateToDoDone = createAsyncThunk(
  "UPDATE_ToDoDone",
  async ({ id, isDone }) => {
    const response = await axios.put(`http://13.124.204.3/todo/${id}`, {
      isDone: isDone,
    });
    console.log(response)
    return response.data;
  }
);

const toDoSlice = createSlice({
  name: 'toDoList',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getList.fulfilled]: (state, { payload }) => {
      return state = payload.todoArr
    },

    [addList.fulfilled]: (state, { payload }) => [...state, payload],

    [deleteList.fulfilled]: (state, { payload }) =>
      state.filter((toDo) => toDo._id !== payload),

    [updateList.fulfilled]: (state, { payload }) => {
      console.log(payload)
      console.log(current(state))
      return current(state).map((todo) => todo._id === payload._id ? { ...todo, ...payload } : todo)
    },

    [updateToDoDone.fulfilled]: (state, { payload }) => {
      return state.map((toDo) => {
        console.log(toDo)
        if (toDo._id === payload._id) {
          console.log(toDo)
          return { ...toDo, isDone: payload.isDone };
        } else {
          return toDo;
        }
      })
    }
  }
});

export default toDoSlice;
