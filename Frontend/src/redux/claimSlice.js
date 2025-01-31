import { createSlice } from "@reduxjs/toolkit";


const claimSlice=createSlice({
    name: "claim",
    initialState:{
        claimId: null,
    },
    reducers:{
        setClaimId: (state, action)=>{
            state.claimId=action.payload;
        },
        clearClaimId: (state) => {
            state.claimId = null;
        },
    },
});

export const { setClaimId, clearClaimId } = claimSlice.actions;
export default claimSlice.reducer;