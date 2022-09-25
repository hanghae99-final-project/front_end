import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const __getWeeklyData = createAsyncThunk("/weekly", async (payload, thunkAPI) => {
  console.log(payload);
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_URL + `/myPage/weeklyStudy/2022-09-26/2022-10-02`,
      // process.env.REACT_APP_SERVER_URL + `/myPage/weeklyStudy/${payload.startWeek}/${payload.endWeek}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      }
    );
    console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const mySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getWeeklyData.fulfilled]: (state, { payload }) => (state = payload)
  }
});

export default mySlice;
