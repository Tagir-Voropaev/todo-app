import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchAllSchools = createAsyncThunk('scripts/fetchAllSchools', async () => {
    const { data } = await axios.get('/schools');
    return data
})


const initialState = {
    items: [],
    error: false,
    status: 'loading',
}


const allSchoolsSlice = createSlice({
    name: "allschools",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSchools.pending, (state) => {
                state.status = "loading";
                state.error = false;
            })
            .addCase(fetchAllSchools.fulfilled, (state, action) => {
                state.items = action.payload;
                state.error = false;
                state.status = "loaded";
            })
            .addCase(fetchAllSchools.rejected, (state) => {
                state.items = [];
                state.error = true;
                state.status = "error";
            })
    }
});

export default allSchoolsSlice.reducer;