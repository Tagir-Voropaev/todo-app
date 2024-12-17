// client/src/store/timetable/allLessonsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAllLessons = createAsyncThunk('lessons/fetchAllLessons', async () => {
    const { data } = await axios.get('/lessons');
    return data;
}
);

const initialState = {
    items: [],
    status: 'loading',
    error: null
};

const allLessonsSlice = createSlice({
    name: "allLessons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLessons.pending, (state) => {
                state.status = "loading";
                state.items = [];
            })
            .addCase(fetchAllLessons.fulfilled, (state, action) => {
                state.status = "loaded";
                state.items = action.payload;
            })
            .addCase(fetchAllLessons.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
                state.items = [];
            });
    }
});

export default allLessonsSlice.reducer;