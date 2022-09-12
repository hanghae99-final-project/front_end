import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { myDday: [] };

export const __getDday = createAsyncThunk('/Dday', async (payload, thunkAPI) => {
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

const dDaySlice = createSlice({
    name: 'dDaySlice',
    initialState,
    reducers: {},
    extraReducers: {
        [__getDday.fulfilled]: (state, { payload }) => (state = payload),
    },
});

export default dDaySlice;
