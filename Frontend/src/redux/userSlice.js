import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name: "user",
    initialState:{
        cusId: null,
    },
    reducers:{
        setUserId: (state, action)=>{
            state.cusId=action.payload;
        },
        clearUserId: (state) => {
            state.cusId = null;
        },
    },
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer;