import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const get_studytime = createAsyncThunk('get_studytime', async (payload, thunkAPI) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + `time`);
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = '';

const timeTimerSlice = createSlice({
    name: 'timeTimerSlice',
    initialState,
    reducers: {},

    extraReducers: {
        [get_studytime.fulfilled]: (state, { payload }) => (state = payload),
    },
});

export default timeTimerSlice;
