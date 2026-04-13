import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface JobDataSliceType{
    data:{}
}
const initialState:JobDataSliceType={
    data:{}
}
const JobDataSlice = createSlice({
  name: 'JobData',
  initialState,
  reducers: {
    setJobData: (state:any, action: any) => {
      state.data = action.payload;
    },

  },
});

export const { setJobData } = JobDataSlice.actions;
export default JobDataSlice.reducer;