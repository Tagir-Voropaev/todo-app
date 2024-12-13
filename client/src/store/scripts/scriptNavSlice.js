import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchNavScripts = createAsyncThunk('scripts/fetchNavScripts', async () => {
    const { data } = await axios.get('/scripts/tabs');
    return data
})


const initialState = {
    tabs: [],
    subtabs: [],
    status: 'loading',
    error: false,
}


const navscriptSlice = createSlice({
    name: "navscript",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNavScripts.pending, (state) => {
                state.status = "loading";
                state.error = false;
            })
            .addCase(fetchNavScripts.fulfilled, (state, action) => {
                state.tabs = action.payload.tabs;
                state.subtabs = action.payload.subtabs;
                state.error = false;
                state.status = "loaded";
            })
            .addCase(fetchNavScripts.rejected, (state) => {
                state.tabs = [];
                state.subtabs = [];
                state.error = true;
                state.status = "error";
            })
    }
});

export default navscriptSlice.reducer;