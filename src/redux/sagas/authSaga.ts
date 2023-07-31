import { PayloadAction } from "@reduxjs/toolkit";
import {
  SignInResponseData,
  SignInUserPayload,
  SignUpResponseData,
  SignUpUserPayload,
} from "../@types";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { setAccessToken, signInUser, signUpUser } from "../reducers/authSlice";
import { ApiResponse } from "apisauce";
import API from "../../utils/api";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";

function* signUpWorker(action: PayloadAction<SignUpUserPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<SignUpResponseData> = yield call(
    API.signUpUser,
    data
  );
  if (response.ok && response.data) {
    const accessToken = response.data.boostrapData.user.access_token.split("|")[1];
    yield put(setAccessToken(accessToken));
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    callback();
  } else {
    console.error("Sign Up User error", response.problem);
  }
}

function* signInWorker(action: PayloadAction<SignInUserPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<SignInResponseData> = yield call(
    API.signInUser,
    data
  );
  if (response.ok && response.data) {
    const accessToken = response.data.user.access_token.split("|")[1];
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    callback();
  } else {
    console.warn("Error sign in user", response.problem);
  }
}

export default function* authSagaWatcher() {
    yield all([
        takeLatest(signUpUser, signUpWorker),
        takeLatest(signInUser, signInWorker),
    ])
}
