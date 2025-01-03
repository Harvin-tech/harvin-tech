import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import enrollReducer from './enrollSlice';
import courseReducer from './courseSlice';
import enrollmentReducer from './enrollementSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        enroll: enrollReducer,
        courses: courseReducer,
         enrollment: enrollmentReducer,
    },
});

export default store;
