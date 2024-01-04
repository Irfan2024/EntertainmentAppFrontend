import { configureStore } from "@reduxjs/toolkit";
import countentSlice from "./contentSlices";
export const store = configureStore({
  reducer: { content: countentSlice },
});
