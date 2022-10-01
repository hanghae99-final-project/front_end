import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

const initialState = { quote: "", studing: 0 };

export const __getLogin = createAsyncThunk("/login", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + `/users/kakao/callback?code=${payload}`);
    return thunkAPI.fulfillWithValue(data.token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getQuote = createAsyncThunk("/quote", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + "/quote", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    return thunkAPI.fulfillWithValue(data.Quotes.title);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getStuding = createAsyncThunk("/studing", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + "/studying", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getLogin.fulfilled]: (state, { payload }) => {
      return { ...state, user: jwtDecode(payload), token: payload };
    },
    [__getQuote.fulfilled]: (state, { payload }) => {
      return { ...state, quote: payload };
    },
    [__getStuding.fulfilled]: (state, { payload }) => {
      return { ...state, studing: payload.studyingCount };
    }
  }
});

export default mainSlice;
