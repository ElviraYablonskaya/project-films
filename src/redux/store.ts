import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import movieReducer from "./reducers/movieSlice";
import authReducer from "./reducers/authSlice";
import imageReducer from "./reducers/imageSlice";
import themeReducer from "./reducers/themeSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    movieReducer,
    authReducer,
    imageReducer,
    themeReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
