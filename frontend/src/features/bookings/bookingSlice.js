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
    console.log("slotData: ", slotData);
    try {
      const response = await axios.put('/api/slots/book', slotData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to book slot');
    }
  }
);

export const fetchSlotsByVenue = createAsyncThunk(
  'bookings/fetchSlotsByVenue',
  async ({ venueId, date }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/slots/venue/${venueId}?date=${date}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch slots');
    }
  }
);

export const handlePayment = createAsyncThunk(
  'bookings/handlePayment',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/bookings/${bookingId}/confirm-payment`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to confirm payment');
    }
  }
)

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
      })
      .addCase(fetchSlotsByVenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlotsByVenue.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload;
      })
      .addCase(fetchSlotsByVenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(handlePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handlePayment.fulfilled, (state, action) => {
        state.loading = false;
        const booking = state.bookings.find(b => b._id === action.payload._id);
        if (booking) {
          booking.status = 'confirmed';
        }
      })
      .addCase(handlePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default bookingSlice.reducer;
