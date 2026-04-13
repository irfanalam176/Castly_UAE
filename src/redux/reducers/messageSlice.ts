// redux/reducers/messageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MessageState {
  message: string;
}

const initialState: MessageState = {
  message: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearMessage: state => {
      state.message = '';
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;