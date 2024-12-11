import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";


export const fetchCreateTabs = createAsyncThunk('scripts/fetchCreateTabs', async (params) => {
    const { data } = await axios.post('/scripts/tabs', params);
    return data
})

const initialState = {
    data: null,
    status: 'loading'
}
const createTabsSlice = createSlice({
    name: "createTabs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateTabs.pending, (state) => {
                state.status = "loading";
                state.data = null;
            })
            .addCase(fetchCreateTabs.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "loaded";
            })
            .addCase(fetchCreateTabs.rejected, (state) => {
                state.data = null;
                state.status = "error";
            })

    }
})

export default createTabsSlice.reducer;