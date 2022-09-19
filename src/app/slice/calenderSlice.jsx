import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

export const getMonthList = createAsyncThunk('GET_MONTH', async (selectedMonth) => {
    const month = selectedMonth < 10 ? '0' + selectedMonth : selectedMonth;
    const response = await instance.get(`/mypage/monthlyStudy/${month}`);
    return response.data;
});

const calenderSlice = createSlice({
    name: 'calender',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getMonthList.fulfilled]: (state, { payload }) => {
            return (state = payload.totalStudyTime);
        },
    },
});

export default calenderSlice;
