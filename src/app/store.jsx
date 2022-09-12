import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slice/mainSlice";
import toDoSlice from "./slice/toDoSlice";
import rankingSlice from "./slice/rankingSlice";
import calenderSlice from "./slice/calenderSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    toDo: toDoSlice.reducer,
    ranking: rankingSlice.reducer,
    calender: calenderSlice.reducer,
  },
});
