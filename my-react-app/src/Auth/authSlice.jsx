import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
  isLoggedIn: false,
  role: null,
  user: null,
  isLoading: false,
  error: null,
};

// Asynchronous thunk to handle login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    console.log('Login credentials:', email, password);

    try {
      const csrfToken = Cookies.get('csrftoken');
      const response = await axios.post(
        'http://localhost:8000/api/token/',
        { email, password },
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        }
      );

      // Store tokens and user data
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('username', response.data.email);
      localStorage.setItem('email', email); 
      localStorage.setItem('password', password); 

      return {
        accessToken: response.data.access,
        role: response.data.role,
        user: response.data.email,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.user = null;
      localStorage.clear(); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.role = action.payload.role;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
