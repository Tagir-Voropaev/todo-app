import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAllSchools = createAsyncThunk('schools/fetchAllSchools', async () => {
    const { data } = await axios.get('/schools');
    return data;
});

const initialState = {
    items: [], // Убедимся, что items всегда массив
    status: 'loading',
    error: null
};

const allSchoolsSlice = createSlice({
    name: 'allschools',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSchools.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAllSchools.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchAllSchools.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default allSchoolsSlice.reducer;