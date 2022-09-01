import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        up: (state, action) => {
            console.log('hi')
        }
    },
});

export default mainSlice;
