import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, // Stores authenticated user data
    isAuthenticated: false, // Tracks whether the user is logged in
    loading: false, // Indicates if authentication actions are in progress
    error: null, // Stores any authentication-related errors
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload; // Set user data from the action payload
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(action.payload)); // Persist user data
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
