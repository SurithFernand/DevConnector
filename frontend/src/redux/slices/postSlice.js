import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPosts = createAsyncThunk(
    'post/getPosts',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('/api/posts');
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getPost = createAsyncThunk(
    'post/getPost',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/api/posts/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const addPost = createAsyncThunk(
    'post/addPost',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axios.post('/api/posts', formData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const addLike = createAsyncThunk(
    'post/addLike',
    async (postId, { rejectWithValue }) => {
        try {
            const res = await axios.put(`/api/posts/like/${postId}`);
            return { id: postId, likes: res.data };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const removeLike = createAsyncThunk(
    'post/removeLike',
    async (postId, { rejectWithValue }) => {
        try {
            const res = await axios.put(`/api/posts/unlike/${postId}`);
            return { id: postId, likes: res.data };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (postId, { rejectWithValue }) => {
        try {
            await axios.delete(`/api/posts/${postId}`);
            return postId;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const addComment = createAsyncThunk(
    'post/addComment',
    async ({ postId, formData }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `/api/posts/comment/${postId}`,
                formData
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteComment = createAsyncThunk(
    'post/deleteComment',
    async ({ postId, commentId }, { rejectWithValue }) => {
        try {
            const res = await axios.delete(
                `/api/posts/comment/${postId}/${commentId}`
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        post: null,
        loading: true,
        error: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.post = action.payload;
                state.loading = false;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload);
                state.loading = false;
            })
            .addCase(addLike.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) =>
                    post._id === action.payload.id
                        ? { ...post, likes: action.payload.likes }
                        : post
                );
            })
            .addCase(removeLike.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) =>
                    post._id === action.payload.id
                        ? { ...post, likes: action.payload.likes }
                        : post
                );
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(
                    (post) => post._id !== action.payload
                );
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.post.comments = action.payload;
                state.loading = false;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.post.comments = action.payload;
                state.loading = false;
            });
    }
});

export default postSlice.reducer;
