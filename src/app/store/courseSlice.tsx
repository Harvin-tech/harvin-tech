// redux/courseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CourseData {
  id: string;
  title: string;
  price: string;
  desc: string;
  instructor: string;
  rating: number;
  reviewsCount: number;
  originalPrice?: number;
}

interface CourseState {
  courses: CourseData[];
  loading: boolean;
}

const initialState: CourseState = {
  courses: [],
  loading: true,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<CourseData[]>) => {
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
