import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const __getProfile = createAsyncThunk(
  "__getProfile",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/profile",
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

export const __checkNickname = createAsyncThunk(
  "__checkNickname",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER_URL + `/check/nick/${payload}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      return thunkAPI.fulfillWithValue(data.data.ok);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const __updateProfile = createAsyncThunk(
  "__updateProfile",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      await axios.put(process.env.REACT_APP_SERVER_URL + "/profile", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(payload);
    }
  }
);

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getProfile.fulfilled]: (state, { payload }) => {
      return { ...payload };
    },
    [__checkNickname.fulfilled]: (state, data) => {
      state.ok = data.payload;
    },
    [__updateProfile.fulfilled]: (state, { payload }) => {
      console.log(payload);
      return payload;
    },
  },
});

export default profileSlice;
