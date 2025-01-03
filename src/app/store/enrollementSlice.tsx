import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// types/enrollment.ts
export interface EnrollmentHistoryItem {
    id: string;
    name: string;
    email: string;
    courseTitle: string;
    startDate: string;
    endDate: string;
  }
  
  export interface EnrollmentState {
    items: EnrollmentHistoryItem[];
    filteredItems: EnrollmentHistoryItem[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    itemsPerPage: number;
    searchQuery: string;
  }
  
  // actions/enrollmentActions.ts
  import { createAsyncThunk } from '@reduxjs/toolkit';
  import { getEnrollDetail } from '@/api';
  import { v4 as uuidv4 } from 'uuid';
  import { formatDate } from '@/utils/helpers';
  
  export const fetchEnrollments = createAsyncThunk(
    'enrollment/fetchEnrollments',
    async (_, { rejectWithValue }) => {
      try {
        const result = await getEnrollDetail();
        return result.data.data.map((item: any) => ({
          id: uuidv4(),
          name: item.user.name,
          email: item.user.email,
          courseTitle: item.course.title,
          startDate: formatDate(item.enrolledAt),
          endDate: formatDate(item.expiredAt ?? new Date().toISOString()),
        }));
      } catch (error) {
        return rejectWithValue('Failed to fetch enrollment data');
      }
    }
  );
  
  // slice/enrollmentSlice.ts


  
  const initialState: EnrollmentState = {
    items: [],
    filteredItems: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 6,
    searchQuery: '',
  };
  
  const enrollmentSlice = createSlice({
    name: 'enrollment',
    initialState,
    reducers: {
      setSearchQuery: (state, action: PayloadAction<string>) => {
        state.searchQuery = action.payload;
        state.filteredItems = state.items.filter(
          (item) =>
            item.name.toLowerCase().includes(action.payload.toLowerCase()) ||
            item.email.toLowerCase().includes(action.payload.toLowerCase())
        );
        state.currentPage = 1;
      },
      setCurrentPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchEnrollments.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(
          fetchEnrollments.fulfilled,
          (state, action: PayloadAction<EnrollmentHistoryItem[]>) => {
            state.loading = false;
            state.items = action.payload;
            state.filteredItems = action.payload;
          }
        )
        .addCase(fetchEnrollments.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { setSearchQuery, setCurrentPage } = enrollmentSlice.actions;
  export default enrollmentSlice.reducer;
  
