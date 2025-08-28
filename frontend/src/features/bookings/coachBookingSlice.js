import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const fetchCoaches = createAsyncThunk(
  "coaches/fetchCoaches",
  async (filters, { rejectWithValue }) => {
      try {
        // const query = new URLSearchParams();
        // Object.entries(filters).forEach(([key, value]) => {
        // if (value && value !== "") query.append(key, value);
        // });

        const response = await axios.get(`/api/coaches`);
        console.log('response: ', response)

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch coaches"
      );
    }
  }
);

const coachSlice = createSlice({
    name: 'coaches',
    initialState: {
        coaches: [],
        loading: false,
        error: null
    },
    reducers: {
        // Define your reducers here
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoaches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCoaches.fulfilled, (state, action) => {
                state.loading = false;
                state.coaches = action.payload;
            })
            .addCase(fetchCoaches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// export const { } = coachSlice.actions;

export default coachSlice.reducer;
