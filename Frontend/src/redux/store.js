import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";
import claimReducer from "./claimSlice"


export default configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        claim: claimReducer
    }
});

