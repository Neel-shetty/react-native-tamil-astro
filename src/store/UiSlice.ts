import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  showGenderOptions: boolean;
  flow: 'category' | 'astrologer';
  communicationType: 'chat' | 'call';
}

const initialState: UserState = {
  showGenderOptions: false,
  flow: 'category',
  communicationType: 'chat',
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
    setCommunicationType: (state, action: PayloadAction<'chat' | 'call'>) => {
      state.communicationType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setShowGenderOptions, setFlow, setCommunicationType} =
  userSlice.actions;

export default userSlice.reducer;
