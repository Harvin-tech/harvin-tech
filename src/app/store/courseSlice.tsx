// redux/courseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState = {
  courses: [],
  loading: true,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action: any) => {
      console.log("ehdhe")
      state.courses = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCourses, setLoading } = courseSlice.actions;

export default courseSlice.reducer;
