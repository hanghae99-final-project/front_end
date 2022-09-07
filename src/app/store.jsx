import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slice/mainSlice";
import timeTimerSlice from "./slice/timeTimerSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    timer: timeTimerSlice.reducer,
  },
});
