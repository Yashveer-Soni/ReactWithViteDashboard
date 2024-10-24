import { configureStore } from '@reduxjs/toolkit';
import authReducer from './src/Auth/authSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,  
  },
});
