import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
  UserData, // Тип возвращаемого значения
  LoginCredentials, // Тип аргументов
  { rejectValue: string } // Тип ошибки
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

// Создаем слайс
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Дополнительные синхронные редьюсеры, если нужно
    logoutUser(state) {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка состояния "загрузка"
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Обработка успешного завершения
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.user = action.payload;
      })

      // Обработка ошибки
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  },
});

// Экспортируем экшены и редьюсер
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;