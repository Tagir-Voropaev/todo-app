import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: '',
    filtered: [],
}


const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        setFilterSearch: (state, action) => {
            state.filtered = action.payload
        }
    }
})

export const { setSearchValue, setFilterSearch } = searchSlice.actions
export default searchSlice.reducer;