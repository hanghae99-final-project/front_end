import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { myDday: [] };

export const __getDday = createAsyncThunk("DdaySlice/getDday", async (payload, thunkAPI) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + `/profile/dday`, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        });
        console.log(data);
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __postDday = createAsyncThunk("DdaySlice/postDday", async (payload, thunkAPI) => {
    console.log(payload);
    try {
        const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + `/profile/dday`, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        });
        console.log(data);
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __delDday = createAsyncThunk("DdaySlice/postDday", async (payload, thunkAPI) => {
    console.log(thunkAPI);
    try {
        const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + `/profile/dday/${payload}`, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        });
        console.log(data);
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const dDaySlice = createSlice({
    name: "dDaySlice",
    initialState,
    reducers: {},
    extraReducers: {
        [__getDday.fulfilled]: (state, { payload }) => (state = payload),
        [__postDday.fulfilled]: (state, { payload }) => {
            console.log(current(state));
        },
    },
});

export default dDaySlice;
