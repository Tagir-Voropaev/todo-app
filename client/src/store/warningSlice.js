import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    warningHide: false,
}


const warningSlice = createSlice({
    name: "warning",
    initialState,
    reducers: {
        warningScript: (state, action) => {
            state.warningHide = action.payload.warningval
        },

    }
})

export const { warningScript } = warningSlice.actions
export default warningSlice.reducer;