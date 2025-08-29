import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const fetchCoaches = createAsyncThunk(
  "coaches/fetchCoaches",
  async (filters, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/api/coaches`);
        
        return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch coaches"
      );
    }
  }
);

export const getCoachDetails = createAsyncThunk(
  "coaches/getCoachDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/coaches/${id}`);
      // console.log('response: ', response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch coach details"
      );
    }
  }
);

export const getCoachSlots = createAsyncThunk(
  "coaches/getCoachSlots",
  async ({ coachId, date }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/coaches/slots`, {
        params: { coachId, date },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching slots");
    }
  }
);

export const bookCoachSlot = createAsyncThunk(
  "coaches/bookCoachSlot",
  async ({ slotIds }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/coaches/slots/book`, { slotIds });
      return data; // { message, booking }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Booking failed");
    }
  }
);

const coachSlice = createSlice({
    name: 'coaches',
    initialState: {
        coaches: [],
        slots: [],
        coachDetails: null,
        bookingConfirmation: null,
        loading: false,
        slotsLoading: false,
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
            })
            .addCase(getCoachDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCoachDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.coachDetails = action.payload;
            })
            .addCase(getCoachDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCoachSlots.pending, (state) => {
                state.slotsLoading = true;
                state.error = null;
            })
            .addCase(getCoachSlots.fulfilled, (state, action) => {
              state.slotsLoading = false;
              // Only update if changed
              if (JSON.stringify(state.slots) !== JSON.stringify(action.payload)) {
                state.slots = action.payload;
              }
            })
            .addCase(getCoachSlots.rejected, (state, action) => {
                state.slotsLoading = false;
                state.error = action.payload;
            })
            .addCase(bookCoachSlot.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bookCoachSlot.fulfilled, (state, action) => {
              state.loading = false;
              state.bookingConfirmation = action.payload.bookings; // array of bookings

              // Mark booked slots as unavailable
              const bookedSlotIds = action.payload.bookings.map(b => b.slot);
              state.slots = state.slots.map(slot =>
                bookedSlotIds.includes(slot._id) ? { ...slot, status: "booked" } : slot
              );
            })
            .addCase(bookCoachSlot.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// export const { } = coachSlice.actions;

export default coachSlice.reducer;
