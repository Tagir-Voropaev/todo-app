// client/src/store/timetable/createLessonSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const createLesson = createAsyncThunk('lessons/createLesson', async (lessonData) => {
    try {
        const { data } = await axios.post('/lessons', lessonData);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}
);

const initialState = {
    lesson: null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null
};

const createLessonSlice = createSlice({
    name: 'createLesson',
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createLesson.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createLesson.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.lesson = action.payload;
                state.error = null;
            })
            .addCase(createLesson.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { clearStatus } = createLessonSlice.actions;

export default createLessonSlice.reducer;