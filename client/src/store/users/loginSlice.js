import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchLoginUser = createAsyncThunk('auth/fetchLoginUser', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/login', params);
        return data
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// export const fetchGetUser = createAsyncThunk('auth/fetchGetUser', async (params) => {
//     const { data } = await axios.get('/users', params);
//     return data
// })



const initialState = {
    data: null,
    status: 'loading',
    error: null,
}
const loginUser = createSlice({
    name: "loginUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoginUser.pending, (state) => {
                state.status = "loading";
                state.data = null;
            })
            .addCase(fetchLoginUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = false;
                state.status = "loaded";
            })
            .addCase(fetchLoginUser.rejected, (state, action) => {
                state.data = action.payload;
                state.error = true;
                state.status = "error";
            })
    }
})

export default loginUser.reducer;