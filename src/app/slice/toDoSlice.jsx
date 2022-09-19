import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import instance from './instance';

const now = new Date();
const year = now.getFullYear();
const months = ('0' + (now.getMonth() + 1)).slice(-2);
const days = ('0' + now.getDate()).slice(-2);

export const getList = createAsyncThunk('GET_TODO', async () => {
    const response = await instance.get(`/todo/${year}-${months}-${days}`);
    return response.data;
});

export const dailyTodo = createAsyncThunk('dailyTodo', async ({ year, month, date }) => {
    const response = await instance.get(`/mypage/dailyTodo/${year}-${month}-${date}`);
    return response.data.todoData;
});

export const addList = createAsyncThunk('ADD_TODO', async (toDo) => {
    const response = await instance.post(`/todo`, toDo);
    return response.data;
});

export const deleteList = createAsyncThunk('DELETE_TODO', async (toDoId) => {
    const response = await instance.delete(`/todo/${toDoId}`);
    console.log(response);
    return toDoId;
});

export const updateList = createAsyncThunk('UPDATE_LIST', async (payload) => {
    const response = await instance.put(`/todo/${payload.toDoId}`,  payload.upDateToDo );
    return response.data;
});

export const updateToDoDone = createAsyncThunk('UPDATE_ToDoDone', async ({ id, isDone }) => {
    const response = await instance.put(`/todo/${id}`, { isDone: isDone });
    return response.data;
});

const toDoSlice = createSlice({
    name: 'toDoList',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getList.fulfilled]: (state, { payload }) => {
            return (state = payload.todoArr);
        },

        [addList.fulfilled]: (state, { payload }) => [...state, payload],

        [deleteList.fulfilled]: (state, { payload }) => state.filter((toDo) => toDo._id !== payload),

        [updateList.fulfilled]: (state, { payload }) => {
            return current(state).map((todo) => (todo._id === payload._id ? { ...todo, ...payload } : todo));
        },

        [updateToDoDone.fulfilled]: (state, { payload }) => {
            return state.map((toDo) => {
                if (toDo._id === payload._id) {
                    return { ...toDo, isDone: payload.isDone };
                } else {
                    return toDo;
                }
            });
        },

        [dailyTodo.fulfilled]: (state, { payload }) => {
            return state = payload.todoArr
        }
    }
});

export default toDoSlice;