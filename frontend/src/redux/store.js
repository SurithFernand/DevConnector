// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';

// export const store = configureStore({
//     reducer: {
//         auth: authReducer
//     }
// });

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import postReducer from './slices/postSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        post: postReducer
    }
});
