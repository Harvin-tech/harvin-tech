// redux/courseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState = {
  courses: [],
  allCourses:[],
  loading: true,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setOneCourses:(state,action:any)=>{
      state.courses=action.payload;
      state.loading=false;

    },
    setCourses: (state, action: any) => {
      state.allCourses = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCourses, setLoading,setOneCourses } = courseSlice.actions;

export default courseSlice.reducer;
