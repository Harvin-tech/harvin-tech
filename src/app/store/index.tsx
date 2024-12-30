import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import enrollReducer from './enrollSlice';
import courseReducer from './courseSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        enroll: enrollReducer,
        courses: courseReducer,
    },
});

export default store;
