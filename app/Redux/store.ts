"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './Features/counter/counterSlice';
import youtubeSlice from "./Features/youtube/youtubeSlice";
import searchSlice from "./Features/search/searchSlice";

export const store = configureStore({
    reducer:{
        counter:counterReducer,
        youtube:youtubeSlice,
        search:searchSlice
    }
})

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;