import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from './instance';

export const getMonthList = createAsyncThunk('GET_MONTH', async (selectedMonth) => {
    const month = selectedMonth < 10 ? '0' + selectedMonth : selectedMonth;
    console.log(month);

    const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/mypage/monthlyStudy/${month}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    console.log(response);
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
