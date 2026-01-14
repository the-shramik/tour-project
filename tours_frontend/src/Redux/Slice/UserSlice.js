import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../API/API";
import { userSignUP } from "../API/API";


const userSlice = createSlice({
    name:'user',
    initialState:{
        loading:false,
        user:null,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state)=>{
            state.loading = true;
            state.user = null;
            state.error = null; 
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.error= null;
        })
        .addCase(userLogin.rejected,(state,action)=>{
            state.loading = false;
            state.user = null;
            state.error = action.error.message;
        })
        .addCase(userSignUP.pending,(state)=>{
            state.loading = true;
            state.user = null;
            state.error = null; 
        })
        .addCase(userSignUP.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.error= null;
        })
        .addCase(userSignUP.rejected,(state,action)=>{
            state.loading = false;
            state.user = null;
            state.error = action.error.message; 
        })
    }
})

export default userSlice.reducer;