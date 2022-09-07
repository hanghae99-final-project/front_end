import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './slice/mainSlice';
import rankingSlice from './slice/rankingSlice';
import toDoSlice from './slice/toDoSlice';

export const store = configureStore({
    reducer: {
        main: mainSlice.reducer,
        ranking: rankingSlice.reducer,
        toDo: toDoSlice.reducer,
    },
});
