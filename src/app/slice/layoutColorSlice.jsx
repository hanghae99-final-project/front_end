import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const colorSlice = createSlice({
    name: "colorSlice",
    initialState,
    reducers: {
        changeColor: (state, { payload }) => {
            return (state = payload);
        },
    },
});

export default colorSlice;
export const { changeColor } = colorSlice.actions;
