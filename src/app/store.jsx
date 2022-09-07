import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './slice/mainSlice';
import rankingSlice from './slice/rankingSlice';

export const store = configureStore({
    reducer: {
        main: mainSlice.reducer,
        ranking: rankingSlice.reducer,
    },
});
