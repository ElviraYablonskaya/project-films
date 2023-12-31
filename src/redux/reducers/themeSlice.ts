import { Theme } from "../../@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  themeValue: Theme;
};

const initialState: InitialState = {
  themeValue: Theme.Dark,
};

const themeSlice = createSlice({
  name: "themeReducer",
  initialState,
  reducers: {
    setThemeValue: (state, action: PayloadAction<Theme>) => {
      state.themeValue = action.payload;
    },
  },
});

export const { setThemeValue } = themeSlice.actions;

export const ThemeSelectors = {
  getThemeValue: (state: RootState) => state.themeReducer.themeValue,
};

export default themeSlice.reducer;
