import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from './instance';

export const get_studytime = createAsyncThunk('get_studytime', async (payload, thunkAPI) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + '/time', {
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

export const __postStudyStart = createAsyncThunk('/studyStart', async (payload, thunkAPI) => {
    try {
        await axios.post('/time/studyStart', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        });
        return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __postStudyEnd = createAsyncThunk('/studyEnd', async (payload, thunkAPI) => {
    try {
        await axios.post('/time/studyEnd', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        });
        return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __postRestStart = createAsyncThunk('/restStart', async (payload, thunkAPI) => {
    try {
        await axios.post('/time/restStart', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        });
        return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __postRestEnd = createAsyncThunk('/restEnd', async (payload, thunkAPI) => {
    try {
        await axios.post('/time/restEnd', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        });
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
        [__postRestStart.fulfilled]: (state, { payload }) => {
            return (state = {
                ...state,
                savedStudyTime: state.savedStudyTime + payload.studyEndPoint - state.studyStartPoint,
                studyStartPoint: 0,
                restStartPoint: payload.restStartPoint,
            });
        },
    },
});

export default timeTimerSlice;
