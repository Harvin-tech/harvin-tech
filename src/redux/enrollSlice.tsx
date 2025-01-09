import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EnrollmentHistoryItem {
  id: string;
  name: string;
  email: string;
  courseTitle: string;
  startDate: string;
  endDate: string;
}

interface EnrollState {
  data: EnrollmentHistoryItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EnrollState = {
  data: [],
  isLoading: false,
  error: null,
};

const enrollSlice = createSlice({
  name: 'enroll',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setEnrollData: (state, action: PayloadAction<EnrollmentHistoryItem[]>) => {
      state.data = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setEnrollData, setError } = enrollSlice.actions;

export default enrollSlice.reducer;
