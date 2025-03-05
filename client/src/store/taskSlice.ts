import api from './api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Интерфейс для данных задачи
interface TaskData {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    club: string;
    createdAt: string;
    updatedAt: string;
}

// Интерфейс для состояния слайса
interface TaskState {
    tasks: TaskData[]; // Список задач
    loading: boolean;
    error: string | null;
}

// Начальное состояние
const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};

// Асинхронный Thunk для получения списка задач
export const fetchTasks = createAsyncThunk(
    'task/fetchTasks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/tasks/getall'); // Используем endpoint /tasks/getall
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при получении списка задач');
        }
    }
);

// Создание слайса
const taskSlice = createSlice({
    name: 'task', // Исправлено с 'auth' на 'task'
    initialState,
    reducers: {
        // Синхронный редьюсер для очистки ошибки
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Обработка состояния pending (запрос отправлен)
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Обработка состояния fulfilled (запрос успешно выполнен)
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<TaskData[]>) => {
                state.loading = false;
                state.tasks = action.payload; // Сохраняем список задач
            })
            // Обработка состояния rejected (запрос завершился ошибкой)
            .addCase(fetchTasks.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Экспортируем экшены и редьюсер
export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;