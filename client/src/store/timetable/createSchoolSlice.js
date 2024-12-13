import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchCreateSchool = createAsyncThunk('scripts/fetchCreateSchool', async (value) => {
    const { data } = await axios.post('/schools', value);
    return data
})

const initialState = {
    data: null,
    status: 'loading'
}
const createSchoolSlice = createSlice({
    name: "createSchool",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateSchool.pending, (state) => {
                state.status = "loading";
                state.data = null;
            })
            .addCase(fetchCreateSchool.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "loaded";
            })
            .addCase(fetchCreateSchool.rejected, (state) => {
                state.data = null;
                state.status = "error";
            })

    }
})

export default createSchoolSlice.reducer;