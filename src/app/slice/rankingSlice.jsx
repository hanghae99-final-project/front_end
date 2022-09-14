import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __getRanking = createAsyncThunk(
  "__getRanking",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/rank?period=week&category=all",
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = "";

const rankingSlice = createSlice({
  name: "rankingSlice",
  initialState,
  reducers: {},

  extraReducers: {
    [__getRanking.fulfilled]: (state, { payload }) => (state = payload),
  },
});

export default rankingSlice;
