import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const get_studytime = createAsyncThunk("get_studytime", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + "/time", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postStudyStart = createAsyncThunk("/studyStart", async (payload, thunkAPI) => {
  try {
    await axios.post(process.env.REACT_APP_SERVER_URL + "/time/studyStart", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postStudyEnd = createAsyncThunk("/studyEnd", async (payload, thunkAPI) => {
  try {
    await axios.post(process.env.REACT_APP_SERVER_URL + "/time/studyEnd", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postRestStart = createAsyncThunk("/restStart", async (payload, thunkAPI) => {
  try {
    await axios.post(process.env.REACT_APP_SERVER_URL + "/time/restStart", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postRestEnd = createAsyncThunk("/restEnd", async (payload, thunkAPI) => {
  try {
    await axios.post(process.env.REACT_APP_SERVER_URL + "/time/restEnd", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postTargetTime = createAsyncThunk("/targetTime", async (payload, thunkAPI) => {
  try {
    await axios.post(process.env.REACT_APP_SERVER_URL + "/time/targetTime", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    return thunkAPI.fulfillWithValue(payload.targetTime);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  yesterdayStudyTime: 0,
  targetTime: 0,
  savedStudyTime: 0,
  savedRestTime: 0,
  studyStartPoint: 0,
  restStartPoint: 0
};

const timeTimerSlice = createSlice({
  name: "timeTimerSlice",
  initialState,
  reducers: {},

  extraReducers: {
    [get_studytime.fulfilled]: (state, { payload }) => (state = payload),
    [__postStudyStart.fulfilled]: (state, { payload }) => {
      return (state = {
        ...state,
        ...payload
      });
    },
    [__postStudyEnd.fulfilled]: (state, { payload }) => {
      if (payload.studyEndPoint !== undefined) {
        return (state = {
          ...state,
          studyStartPoint: 0,
          savedStudyTime: state.savedStudyTime + payload.studyEndPoint - state.studyStartPoint
        });
      } else if (payload.restEndPoint !== undefined) {
        return (state = {
          ...state,
          restStartPoint: 0,
          savedRestTime: state.savedRestTime + payload.restEndPoint - state.restStartPoint
        });
      }
    },
    [__postRestStart.fulfilled]: (state, { payload }) => {
      return (state = {
        ...state,
        savedStudyTime: state.savedStudyTime + payload.studyEndPoint - state.studyStartPoint,
        studyStartPoint: 0,
        restStartPoint: payload.restStartPoint
      });
    },
    [__postRestEnd.fulfilled]: (state, { payload }) => {
      return (state = {
        ...state,
        savedRestTime: state.savedRestTime + payload.restEndPoint - state.restStartPoint,
        restStartPoint: 0,
        studyStartPoint: payload.studyStartPoint
      });
    },
    [__postTargetTime.fulfilled]: (state, { payload }) => {
      return (state = { ...state, targetTime: payload });
    }
  }
});

export default timeTimerSlice;
