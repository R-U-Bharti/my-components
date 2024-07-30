import { configureStore } from "@reduxjs/toolkit";
import tourSlice from "./slices/tourSlice";
import { dark, token, userDetails } from "./slices/constantSlice";

const store = configureStore({
    reducer:{
        tours: tourSlice,
        dark: dark.reducer,
        token: token.reducer,
        userDetails: userDetails.reducer
    }
})

export default store;