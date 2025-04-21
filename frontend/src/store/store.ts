import { configureStore } from "@reduxjs/toolkit";
import propertyReducers from "./propertySlice";

export const store = () => {
  return configureStore({
    reducer: {
      property: propertyReducers,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
