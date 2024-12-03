import { createSlice } from "@reduxjs/toolkit";





const initialState = {
    content: {
        items: [],
    }
}


const windowsSlice = createSlice({
    name: "windows",
    initialState,
    reducers: {

    },
    
});

export const windowsReducer = windowsSlice.reducer;