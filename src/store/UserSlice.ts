import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  loggedIn: boolean;
}

const initialState: UserState = {
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setLoggedIn} = userSlice.actions;

export default userSlice.reducer;
