import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from './instance';

export const get_studytime = createAsyncThunk('get_studytime', async (payload, thunkAPI) => {
    try {
        const { data } = await instance.get('/time');
        console.log(data);
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __postStudyStart = createAsyncThunk('/studyStart', async (payload, thunkAPI) => {
    try {
        await instance.post('/time/studyStart', payload);
        return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __postStudyEnd = createAsyncThunk('/studyEnd', async (payload, thunkAPI) => {
    try {
        await instance.post('/time/studyEnd', payload);
        return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    yesterdayStudyTime: 0,
    targetTime: {},
    savedStudyTime: 0,
    savedRestTime: 0,
    studyStartPoint: 0,
    restStartPoint: 0,
};

const timeTimerSlice = createSlice({
    name: 'timeTimerSlice',
    initialState,
    reducers: {},

    extraReducers: {
        [get_studytime.fulfilled]: (state, { payload }) => (state = payload),
        [__postStudyStart.fulfilled]: (state, { payload }) => {
            console.log(payload);
            return (state = {
                ...state,
                ...payload,
            });
        },
        [__postStudyEnd.fulfilled]: (state, { payload }) => {
            return (state = {
                ...state,
                studyStartPoint: 0,
                savedStudyTime: state.savedStudyTime + payload.studyEndPoint - state.studyStartPoint,
            });
        },
    },
});

export default timeTimerSlice;
