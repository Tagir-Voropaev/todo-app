import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";


export const fetchCreateScripts = createAsyncThunk('scripts/fetchCreateScripts', async (value) => {
    const { data } = await axios.post(`/scripts/subtab/${value.id}`, value.values);
    return data
})

const initialState = {
    data: null,
    status: 'loading'
}
const createScriptSlice = createSlice({
    name: "createScripts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateScripts.pending, (state) => {
                state.status = "loading";
                state.data = null;
            })
            .addCase(fetchCreateScripts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "loaded";
            })
            .addCase(fetchCreateScripts.rejected, (state) => {
                state.data = null;
                state.status = "error";
            })

    }
})

export default createScriptSlice.reducer;