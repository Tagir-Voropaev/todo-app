import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchCreateSubTabs = createAsyncThunk('scripts/fetchCreateSubTabs', async (params) => {
    const { data } = await axios.post('/scripts/subtabs', params);
    return data
})

const initialState = {
    data: null,
    status: 'loading'
}
const createSubTabsSlice = createSlice({
    name: "createSubTabs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateSubTabs.pending, (state) => {
                state.status = "loading";
                state.data = null;
            })
            .addCase(fetchCreateSubTabs.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "loaded";
            })
            .addCase(fetchCreateSubTabs.rejected, (state) => {
                state.data = null;
                state.status = "error";
            })

    }
})

export default createSubTabsSlice.reducer;