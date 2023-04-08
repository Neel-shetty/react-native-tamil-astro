import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  showGenderOptions: boolean;
  flow: 'category' | 'astrologer';
}

const initialState: UserState = {
  showGenderOptions: false,
  flow: 'category',
};

export const userSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setShowGenderOptions: (state, action: PayloadAction<boolean>) => {
      state.showGenderOptions = action.payload;
    },
    setFlow: (state, action: PayloadAction<'category' | 'astrologer'>) => {
      state.flow = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setShowGenderOptions, setFlow} = userSlice.actions;

export default userSlice.reducer;
