import { createSlice } from "@reduxjs/toolkit";

const forgotPasswordSlice = createSlice({
    name:"forgotPassword",
    initialState:{
        email:"",
        otp:"",
        resetToken:""
    },
    reducers :{
        setEmailReducer:(state,action)=>{
            state.email=action.payload
        },
        setOtopReducer:(state,action)=>{
            
            state.otp = action.payload
        },
        setResetTokenReducer:(state,action)=>{
            
            state.resetToken = action.payload
        }
    },
})

export const {setEmailReducer,setOtopReducer,setResetTokenReducer} = forgotPasswordSlice.actions
export default forgotPasswordSlice.reducer