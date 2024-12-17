import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAllGroups = createAsyncThunk('groups/fetchAllGroups', async () => {
    const { data } = await axios.get('/groups');
    return data;
});

const initialState = {
    items: [], // Убедимся, что items всегда массив
    status: 'loading',
    error: null
};

const allGroupsSlice = createSlice({
    name: 'allgroups',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllGroups.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAllGroups.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchAllGroups.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default allGroupsSlice.reducer;