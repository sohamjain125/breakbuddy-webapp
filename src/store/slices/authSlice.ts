import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../config/api';
import { RegisterFormData, LoginFormData, ChefLoginFormData } from '../../validations/auth';

// Types
interface User {
  id: string;
  fullName: string;
  employeeId: string;
  email: string;
  role: string;
}

interface Chef {
  id: string;
  name: string;
  chefId: string;
  role: string;
}

interface AuthState {
  user: User | Chef | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Helper to extract best error message
function extractErrorMessage(error: any) {
  if (error?.response?.data) {
    const data = error.response.data;
    if (Array.isArray(data.details) && data.details.length > 0 && data.details[0].message) {
      return data.details[0].message;
    }
    if (typeof data.error === 'string') {
      return data.error;
    }
  }
  return 'Something went wrong';
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
};

// Async thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterFormData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: LoginFormData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/auth/login', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const loginChef = createAsyncThunk(
  'auth/chefLogin',
  async (chefData: ChefLoginFormData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/auth/chef/login', chefData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | Chef>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Chef Login
    builder
      .addCase(loginChef.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginChef.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.chef;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.chef));
      })
      .addCase(loginChef.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer; 