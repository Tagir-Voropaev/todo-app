import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";


export const fetchCreateTasks = createAsyncThunk('tasks/fetchCreateTasks', async (params) => {
    const { data } = await axios.post('/tasks', params);
    return data
})



const initialState = {
    data: null,
    status: 'loading'
}
const createTaskSlice = createSlice({
    name: "createTask",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateTasks.pending, (state) => {
                state.status = "loading";
                state.data = null;
            })
            .addCase(fetchCreateTasks.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "loaded";
            })
            .addCase(fetchCreateTasks.rejected, (state) => {
                state.data = null;
                state.status = "error";
            })
    }
})

export const createTaskReducer = createTaskSlice.reducer;