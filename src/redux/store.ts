import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import movieReducer from "./reducers/movieSlice";
import authReducer from "./reducers/authSlice"

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    movieReducer,
    authReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
