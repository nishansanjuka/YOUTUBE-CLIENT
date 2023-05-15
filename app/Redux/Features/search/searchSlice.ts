"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface searchState {
    value:boolean
}

const initialState:searchState = {
    value:false
}

export const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        setIsSearching: (state , action) => {
            state.value = action.payload;
        }
    }
})

export const {setIsSearching} = searchSlice.actions;

export default searchSlice.reducer;