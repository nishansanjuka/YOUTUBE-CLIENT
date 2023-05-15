"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface counterState {
    value:number
}

const initialState:counterState = {
    value:0
}

export const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increment: (state) => {state.value += 1},
        incrementByamount: (state , action) => {
            state.value += action.payload;
        }
    }
})

export const {increment , incrementByamount } = counterSlice.actions;

export default counterSlice.reducer;