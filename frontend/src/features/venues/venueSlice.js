import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const fetchVenues = createAsyncThunk(
  "venues/fetchVenues",
  async (filters, { rejectWithValue }) => {
      console.log("filters: ", filters)
      try {
        const query = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "") query.append(key, value);
        });

        const response = await axios.get(`/api/venues?${query.toString()}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch venues"
      );
    }
  }
);

export const getVenueDetails = createAsyncThunk(
    "venues/getVenueDetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/venues/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to fetch venue"
            );
        }
    }
)

const venueSlice = createSlice({
    name: 'venues',
    initialState: {
        venues: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVenues.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVenues.fulfilled, (state, action) => {
                state.loading = false;
                state.venues = action.payload;
            })
            .addCase(fetchVenues.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getVenueDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getVenueDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.venue = action.payload;
            })
            .addCase(getVenueDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default venueSlice.reducer;