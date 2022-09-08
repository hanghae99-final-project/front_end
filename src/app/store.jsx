import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './slice/mainSlice';
import toDoSlice from './slice/toDoSlice';
import rankingSlice from './slice/rankingSlice';
import mySlice from './slice/mySlice';

export const store = configureStore({
    reducer: {
        main: mainSlice.reducer,
        toDo: toDoSlice.reducer,
        ranking: rankingSlice.reducer,
        my: mySlice.reducer,
    },
});
