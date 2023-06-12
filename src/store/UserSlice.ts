import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  loggedIn: boolean;
  language: 'en' | 'ta';
}

const initialState: UserState = {
  loggedIn: false, // TODO: Change to false
  language: 'en',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setLanguage: (state, action: PayloadAction<'en' | 'ta'>) => {
      state.language = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setLoggedIn, setLanguage} = userSlice.actions;

export default userSlice.reducer;
