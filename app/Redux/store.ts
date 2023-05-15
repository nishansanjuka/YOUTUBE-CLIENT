"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './Features/counter/counterSlice';
import youtubeSlice from "./Features/youtube/youtubeSlice";

export const store = configureStore({
    reducer:{
        counter:counterReducer,
        youtube:youtubeSlice
    }
})

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;