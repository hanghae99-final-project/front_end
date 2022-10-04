import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";

const initialState = {};

export const __joinUser = createAsyncThunk("__joinUser", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.patch(process.env.REACT_APP_SERVER_URL + "/users/modProfile", payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const __checkNickname = createAsyncThunk("__checkNickname", async (payload, thunkAPI) => {
  try {
    const data = await axios.get(process.env.REACT_APP_SERVER_URL + `/check/nick/${payload}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    return thunkAPI.fulfillWithValue(data.data.ok);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

const joinSlice = createSlice({
  name: "joinSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__joinUser.fulfilled]: (state, action) => {},
    [__checkNickname.fulfilled]: (state, data) => {
      state.ok = data.payload;
    }
  }
});

export default joinSlice;
