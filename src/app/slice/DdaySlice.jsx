import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { myDday: [] };

export const __getMainDday = createAsyncThunk("DdaySlice/getDday", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + `/profile/ddayOne`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getDday = createAsyncThunk("DdaySlice/getDday", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + `/profile/dday`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postDday = createAsyncThunk("DdaySlice/postDday", async (payload, thunkAPI) => {
  console.log(payload);
  try {
    const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + `/profile/dday`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __modifyDday = createAsyncThunk("DdaySlice/modifyDday", async (payload, thunkAPI) => {
  console.log(payload);
  try {
    const { data } = await axios.put(
      process.env.REACT_APP_SERVER_URL + `/profile/dday/${payload.dataId}`,
      { deadline: payload.deadline, content: payload.content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      }
    );
    console.log(data);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __delDday = createAsyncThunk("DdaySlice/delDday", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.delete(process.env.REACT_APP_SERVER_URL + `/profile/dday/${payload}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    console.log(data);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const dDaySlice = createSlice({
  name: "dDaySlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getMainDday.fulfilled]: (state, { payload }) => (state = payload),
    [__getDday.fulfilled]: (state, { payload }) => (state = payload),
    [__postDday.fulfilled]: (state, { payload }) => {
      state.myDday = [...state.myDday, payload];
    },

    [__modifyDday.fulfilled]: (state, { payload }) => {
      state.myDday = state.myDday.map(data => (data._id === payload.dataId ? { ...data, ...payload } : data));
    },

    [__delDday.fulfilled]: (state, { payload }) => {
      state.myDday = state.myDday.filter(data => data._id !== payload);
    }
  }
});

export default dDaySlice;
