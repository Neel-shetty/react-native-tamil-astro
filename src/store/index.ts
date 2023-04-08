import {configureStore} from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import uiReducer from './UiSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
