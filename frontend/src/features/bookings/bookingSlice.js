import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/bookings?userId=${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

export const bookSlot = createAsyncThunk(
  'bookings/bookSlot',
  async (slotData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/bookings', slotData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to book slot');
    }
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bookSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(bookSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
