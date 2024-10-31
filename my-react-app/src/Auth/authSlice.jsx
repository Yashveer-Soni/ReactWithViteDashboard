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

// Login user and store only tokens in local storage
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const csrfToken = Cookies.get('csrftoken');
      const response = await axios.post(
        'http://localhost:8000/api/token/',
        { email, password },
        {
          headers: { 'X-CSRFToken': csrfToken },
          withCredentials: true,
        }
      );

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      return {
        accessToken: response.data.access,
        role: response.data.role,
        user: response.data.email,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

// Restore session and validate token with backend
export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) return rejectWithValue('No session found');

      const response = await axios.get('http://localhost:8000/api/validate_token/', {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });

      const { role, user } = response.data;
      return { accessToken, role, user };
    } catch (error) {
      localStorage.clear();  // Clear invalid session data
      return rejectWithValue('Session expired or invalid');
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
        state.error = action.payload;
      })
      .addCase(restoreSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.role = action.payload.role;
        state.user = action.payload.user;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.role = null;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
