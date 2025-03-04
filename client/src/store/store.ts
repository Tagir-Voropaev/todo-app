import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,  // добавляем редьюсер для task slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;