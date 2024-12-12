import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: '',
    filtered: [],
}


const searchScriptSlice = createSlice({
    name: "searchScripts",
    initialState,
    reducers: {
        setSearchValueScript: (state, action) => {
            state.searchValue = action.payload
        },
        setFilterSearchScript: (state, action) => {
            state.filtered = action.payload
        }
    }
})

export const { setSearchValueScript, setFilterSearchScript } = searchScriptSlice.actions
export default searchScriptSlice.reducer;