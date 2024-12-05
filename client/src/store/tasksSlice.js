import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const { data } = await axios.get('/tasks');
    return data
})


const initialState = {
    tasks: {
        items: [],
        status: 'loading',
        error: false,
    }
}


const tasksSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.tasks.status = "loading";
                state.error = false;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks.items = action.payload;
                state.error = false;
                state.tasks.status = "loaded";
            })
            .addCase(fetchTasks.rejected, (state) => {
                state.tasks.items = [];
                state.error = true;
                state.tasks.status = "error";
            })
    }
});

export const tasksReducer = tasksSlice.reducer;