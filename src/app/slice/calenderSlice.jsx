import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from './instance';

export const getMondthList = createAsyncThunk('GET_MONTH', async (selectedMonth) => {
  console.log(selectedMonth)
  const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/mypage/monthlyStudy/${selectedMonth}`, { headers: { Authorization: `Bearer ${localStorage.token}` } }
  );
  console.log(response);
  return response.data
});

const calenderSlice = createSlice({
  name: 'calender',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getMondthList.fulfilled]: (state, { payload }) => {
      return (state = payload.totalStudyTime)
    },
  },
});

export default calenderSlice;