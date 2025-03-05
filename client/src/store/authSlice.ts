import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Для декодирования JWT токена
import api from './api';
// Типы для данных пользователя
interface UserData {
  id: string;
  login: string;
  role: string;
  token: string;
  isAuth: boolean;
}

// Типы для состояния аутентификации
interface AuthState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Асинхронный Thunk для регистрации пользователя
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials: { login: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/registration', credentials); // Используем api вместо axios
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Ошибка регистрации');
    }
  }
);

// Асинхронный Thunk для входа пользователя
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { login: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials); // Используем api вместо axios
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Ошибка авторизации');
    }
  }
);

// Асинхронный Thunk для проверки авторизации
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/check'); // Используем api вместо axios
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Ошибка проверки авторизации');
    }
  }
);


// Асинхронный Thunk для выхода пользователя
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Ошибка выхода');
    }
  }
);

// Создаем слайс
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Синхронный редьюсер для очистки ошибки
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка регистрации пользователя
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.user = action.payload;
        state.user.isAuth = true;
        localStorage.setItem('token', action.payload.token); // Сохраняем токен в localStorage
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Обработка входа пользователя
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.user = action.payload;
        state.user.isAuth = true;
        localStorage.setItem('token', action.payload.token); // Сохраняем токен в localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Обработка проверки аутентификации
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.user = action.payload;
        state.user.isAuth = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        localStorage.removeItem('token'); // Удаляем токен, если проверка не удалась
      })

      // Обработка выхода пользователя
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem('token'); // Удаляем токен при выходе
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспортируем экшены и редьюсер
export const { clearError } = authSlice.actions;
export default authSlice.reducer;