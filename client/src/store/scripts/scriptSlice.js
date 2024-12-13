import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchScripts = createAsyncThunk('scripts/fetchScripts', async (scriptid) => {
    const { data } = await axios.get(`/scripts/subtab/${scriptid}`);
    return data
})


const initialState = {
    scripts: [],
    status: 'loading',
    error: false,
}


const scriptsSlice = createSlice({
    name: "scripts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchScripts.pending, (state) => {
                state.status = "loading";
                state.error = false;
            })
            .addCase(fetchScripts.fulfilled, (state, action) => {
                state.scripts = action.payload;
                state.error = false;
                state.status = "loaded";
            })
            .addCase(fetchScripts.rejected, (state) => {
                state.scripts = [];
                state.error = true;
                state.status = "error";
            })
    }
});

export default scriptsSlice.reducer;