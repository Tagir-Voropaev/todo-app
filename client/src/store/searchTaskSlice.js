import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: '',
    filtered: [],
}


const searchTaskSlice = createSlice({
    name: "searchTask",
    initialState,
    reducers: {
        setSearchValueTask: (state, action) => {
            state.searchValue = action.payload
        },
        setFilterSearchTask: (state, action) => {
            state.filtered = action.payload
        }
    }
})

export const { setSearchValueTask, setFilterSearchTask } = searchTaskSlice.actions
export default searchTaskSlice.reducer;