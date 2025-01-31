import { createSlice } from "@reduxjs/toolkit";


const adminSlice=createSlice({
    name: "admin",
    initialState:{
        admId: null,
    },
    reducers:{
        setAdminId: (state, action)=>{
            state.admId=action.payload;
        },
        clearAdminId: (state) => {
            state.admId = null;
        },
    },
});

export const { setAdminId, clearAdminId } = adminSlice.actions;
export default adminSlice.reducer;