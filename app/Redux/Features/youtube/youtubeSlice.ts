"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface youtubeState {
    video?:Video[] | null
}

const initialState:youtubeState = {
    video:null
}

export const youtubeSlice = createSlice({
    name:'youtube',
    initialState,
    reducers:{
        setYoutubeData: (state , action) => {
            state.video = action.payload;
        }
    }
})

export const {setYoutubeData} = youtubeSlice.actions;

export default youtubeSlice.reducer;