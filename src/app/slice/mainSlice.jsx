import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const get_login = createAsyncThunk('/login', async (payload, thunkAPI) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + `/users/kakao/finish?code=${payload}`);
        console.log(data);
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const get_quote = createAsyncThunk('/quote', async (payload, thunkAPI) => {
    try {
        const { data } = await axios.get('http://localhost:3001/quote');
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const get_studing = createAsyncThunk('/studing', async (payload, thunkAPI) => {
    try {
        const { data } = await axios.get('http://localhost:3001/studing');
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [get_login.fulfilled]: (state, { payload }) => {
            console.log(payload);
            // return state = payload
        },
        [get_quote.fulfilled]: (state, { payload }) => {
            return { ...state, quote: payload };
        },
        [get_studing.fulfilled]: (state, { payload }) => {
            return { ...state, studing: payload };
        },
    },
});

export default mainSlice;
