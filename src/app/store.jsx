import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slice/mainSlice";
import toDoSlice from "./slice/toDoSlice";
import rankingSlice from "./slice/rankingSlice";
import joinSlice from "./slice/joinSlice";
import profileSlice from "./slice/profileSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    toDo: toDoSlice.reducer,
    ranking: rankingSlice.reducer,
    join: joinSlice.reducer,
    profile: profileSlice.reducer,
  },
});
