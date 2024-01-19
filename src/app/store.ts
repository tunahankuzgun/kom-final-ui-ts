import { configureStore } from "@reduxjs/toolkit";
import NavbarReducer from "./reducers/navbar";
import AppReducer from "./reducers/app";
import LoginReducer from "./reducers/login";
import ServoReducer from "./reducers/servo";

export const store = configureStore({
  reducer: {
    app: AppReducer,
    login: LoginReducer,
    navbar: NavbarReducer,
    servo: ServoReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
