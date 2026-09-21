import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

// Load User
export const loadUser = createAsyncThunk(
    'auth/loadUser',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
        }

        try {
            const res = await axios.get('/api/auth');
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Register User
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formData, { dispatch, rejectWithValue }) => {
        try {
            const res = await axios.post('/api/users', formData);
            setAuthToken(res.data.token);
            dispatch(loadUser());
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Login User
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData, { dispatch, rejectWithValue }) => {
        try {
            const res = await axios.post('/api/auth', formData);
            setAuthToken(res.data.token);
            dispatch(loadUser());
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    },
    reducers: {
        logout: (state) => {
            setAuthToken(null);
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state) => {
                state.token = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.user = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
