import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const getMonthList = createAsyncThunk("GET_MONTH", async ({ selectedYear, selectedMonth }) => {
    const month = selectedMonth < 10 ? "0" + selectedMonth : selectedMonth;

    const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/mypage/monthlyStudy/${selectedYear}-${month}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    console.log(response);
    return response.data;
});

const calenderSlice = createSlice({
    name: "calender",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getMonthList.fulfilled]: (state, { payload }) => {
            return (state = payload.totalStudyTime);
        },
    },
});

export default calenderSlice;
