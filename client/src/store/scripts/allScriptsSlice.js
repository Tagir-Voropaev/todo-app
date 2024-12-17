import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchAllScripts = createAsyncThunk('scripts/fetchAllScripts', async () => {
    const { data } = await axios.get('/scripts/subtab/');
    return data
})


const initialState = {
    allscripts: [],
    status: 'loading',
    error: false,
}


const allScriptsSlice = createSlice({
    name: "allscripts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllScripts.pending, (state) => {
                state.status = "loading";
                state.error = false;
            })
            .addCase(fetchAllScripts.fulfilled, (state, action) => {
                state.allscripts = action.payload;
                state.error = false;
                state.status = "loaded";
            })
            .addCase(fetchAllScripts.rejected, (state) => {
                state.scripts = [];
                state.error = true;
                state.status = "error";
            })
    }
});

export default allScriptsSlice.reducer;