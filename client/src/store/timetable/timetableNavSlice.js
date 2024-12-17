import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpenSchool: false,
    isOpenGroup: false,
    selectedSchool: 'Все школы',
    selectedGroup: 'Все группы',
    inputToggleSchool: false,
    inputToggleGroup: false
};

const timetableNavSlice = createSlice({
    name: 'timetableNav',
    initialState,
    reducers: {
        toggleSchoolDropdown: (state, action) => {
            state.isOpenSchool = action.payload;
        },
        toggleGroupDropdown: (state, action) => {
            state.isOpenGroup = action.payload;
        },
        setSelectedSchool: (state, action) => {
            state.selectedSchool = action.payload;
            // При выборе новой школы сбрасываем выбранную группу
            state.selectedGroup = 'Все группы';
        },
        setSelectedGroup: (state, action) => {
            state.selectedGroup = action.payload;
        },
        toggleSchoolInput: (state, action) => {
            state.inputToggleSchool = action.payload;
        },
        toggleGroupInput: (state, action) => {
            state.inputToggleGroup = action.payload;
        },
        resetNavigation: (state) => {
            return initialState;
        }
    }
});

export const {
    toggleSchoolDropdown,
    toggleGroupDropdown,
    setSelectedSchool,
    setSelectedGroup,
    toggleSchoolInput,
    toggleGroupInput,
    resetNavigation
} = timetableNavSlice.actions;

export default timetableNavSlice.reducer;