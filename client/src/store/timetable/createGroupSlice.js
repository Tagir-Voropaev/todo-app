// client/src/store/timetable/createGroupSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchCreateGroup = createAsyncThunk('groups/fetchCreateGroup', async (params) => {
    const { data } = await axios.post('/groups', params);
    return data;
});

const initialState = {
    data: null,
    status: 'loading'
}

const createGroupSlice = createSlice({
    name: "createGroup",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateGroup.pending, (state) => {
                state.status = "loading";
                state.data = null;
            })
            .addCase(fetchCreateGroup.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "loaded";
            })
            .addCase(fetchCreateGroup.rejected, (state) => {
                state.data = null;
                state.status = "error";
            })
    }
});

export default createGroupSlice.reducer;