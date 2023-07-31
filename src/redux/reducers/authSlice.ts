import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SignInUserPayload, SignUpUserPayload } from "../@types";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";

type InitialState = {
  accessToken: string;
};

const initialState: InitialState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem(ACCESS_TOKEN_KEY, action.payload);
    },
    signInUser: (_, __: PayloadAction<SignInUserPayload>) => {},
  },
});

export const { signUpUser, setAccessToken, signInUser } = authSlice.actions;

export const AuthSelectors = {};

export default authSlice.reducer;
