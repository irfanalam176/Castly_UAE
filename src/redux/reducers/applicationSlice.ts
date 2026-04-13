import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:"application",
    initialState:{
        pendingCount:0,
        shortlistedCount:0,
        confirmedCount:0,
    },
    reducers :{
        setPendingCount:(state,action)=>{
            state.pendingCount=action.payload
        },
        setShortlistedCount:(state,action)=>{
            state.shortlistedCount=action.payload
        },
        setConfirmedCount:(state,action)=>{
            state.confirmedCount=action.payload
        }
    },
})

export const {setPendingCount,setShortlistedCount,setConfirmedCount} = applicationSlice.actions
export default applicationSlice.reducer