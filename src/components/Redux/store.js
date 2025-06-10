import { configureStore } from "@reduxjs/toolkit";
import spinnerSlice from "./spinnerSlice";
import usersSlice from "./usersSlice";


const store = configureStore({
    reducer: {
        users: usersSlice,
        spinner: spinnerSlice,
    }
});

export default store;