import { createSlice } from "@reduxjs/toolkit";


export const spinnerSlice = createSlice({
    name:'spinner',
    initialState: {
        loading: false
    },
    reducers: {
        ShowSpinner(state) {
            state.loading = true;
        },
        HiddenSpinner(state) {
            state.loading = false;
        },
    },
});

export const {ShowSpinner, HiddenSpinner} = spinnerSlice.actions;

export default spinnerSlice.reducer;