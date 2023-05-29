import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

type gender = 'Male' | 'Female' | 'Other';

export interface UserState {
  showGenderOptions: boolean;
  flow: 'category' | 'astrologer';
  communicationType: 'chat' | 'call';
  problemCategory:
    | 'Love'
    | 'Career'
    | 'Money'
    | 'Health'
    | 'Family'
    | 'Other'
    | string;
  astrologerCategoryId: number;
  astrologerGender: gender;
  showSupportModal: boolean;
}

const initialState: UserState = {
  showGenderOptions: false,
  flow: 'category',
  communicationType: 'chat',
  problemCategory: 'Other',
  astrologerCategoryId: 1,
  astrologerGender: 'Male',
  showSupportModal: false,
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
    setProblemCategory: (
      state,
      action: PayloadAction<
        'Love' | 'Career' | 'Money' | 'Health' | 'Family' | 'Other' | string
      >,
    ) => {
      state.problemCategory = action.payload;
    },
    setAstrologerCategoryId: (state, action: PayloadAction<number>) => {
      state.astrologerCategoryId = action.payload;
    },
    setAstrologerGender: (state, action: PayloadAction<gender>) => {
      state.astrologerGender = action.payload;
    },
    setShowSupportModal: (state, action: PayloadAction<boolean>) => {
      state.showSupportModal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setShowGenderOptions,
  setFlow,
  setCommunicationType,
  setAstrologerCategoryId,
  setProblemCategory,
  setAstrologerGender,
  setShowSupportModal,
} = userSlice.actions;

export default userSlice.reducer;
