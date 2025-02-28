import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Установите библиотеку для декодирования JWT

// Типы для данных запроса
interface LoginCredentials {
  login: string;
  password: string;
}

// Типы для ответа сервера
interface UserData {
  id: string;
  name: string;
  token: string;
  isAuth: boolean;
  role: string;
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

// Асинхронный Thunk для выполнения POST-запроса
export const loginUser = createAsyncThunk<
  UserData,
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/loginUser',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post<UserData>('http://localhost:5000/api/login', {
        login,
        password,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Ошибка при входе');
      }
      return rejectWithValue('Ошибка сети');
    }
  }
);

// Восстановление состояния авторизации
export const restoreAuth = createAsyncThunk<UserData, void, { rejectValue: string }>(
  'auth/restoreAuth',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return rejectWithValue('Токен отсутствует');
    }

    try {
      // Декодируем токен, чтобы получить данные пользователя
      const decoded = jwtDecode(token) as { id: string; role: string };

      // Проверяем токен на сервере (опционально)
      const response = await axios.get<UserData>('http://localhost:5000/api/checkauth', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      localStorage.removeItem('token'); // Удаляем недействительный токен
      return rejectWithValue('Недействительный токен');
    }
  }
);

// Создаем слайс
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      })
      .addCase(restoreAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreAuth.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(restoreAuth.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при восстановлении авторизации';
      });
  },
});

// Экспортируем экшены и редьюсер
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;