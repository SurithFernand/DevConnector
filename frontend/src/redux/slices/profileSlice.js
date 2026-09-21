import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCurrentProfile = createAsyncThunk(
    'profile/getCurrentProfile',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('/api/profile/me');
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getProfiles = createAsyncThunk(
    'profile/getProfiles',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('/api/profile');
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const createProfile = createAsyncThunk(
    'profile/createProfile',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axios.post('/api/profile', formData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const addExperience = createAsyncThunk(
    'profile/addExperience',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axios.put('/api/profile/experience', formData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteExperience = createAsyncThunk(
    'profile/deleteExperience',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`/api/profile/experience/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const addEducation = createAsyncThunk(
    'profile/addEducation',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axios.put('/api/profile/education', formData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteEducation = createAsyncThunk(
    'profile/deleteEducation',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`/api/profile/education/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteAccount = createAsyncThunk(
    'profile/deleteAccount',
    async (_, { rejectWithValue }) => {
        if (window.confirm('Are you sure? This action CANNOT be undone!')) {
            try {
                await axios.delete('/api/profile');
                return {};
            } catch (err) {
                return rejectWithValue(err.response.data);
            }
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null,
        profiles: [],
        repos: [],
        loading: true,
        error: {}
    },
    reducers: {
        clearProfile: (state) => {
            state.profile = null;
            state.repos = [];
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(getCurrentProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.profile = null;
            })
            .addCase(getProfiles.fulfilled, (state, action) => {
                state.profiles = action.payload;
                state.loading = false;
            })
            .addCase(createProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(addExperience.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(deleteExperience.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(addEducation.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(deleteEducation.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(deleteAccount.fulfilled, (state) => {
                state.profile = null;
                state.loading = false;
            });
    }
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
