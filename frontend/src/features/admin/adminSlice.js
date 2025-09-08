import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { showMessage } from "../../utils/uiSlice";

export const fetchOwnerRequests = createAsyncThunk(
  "admin/fetchOwnerRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/venue-request/pending");
       return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch owner requests"
      );
    }
  }
);

export const getAllOwnerVenues = createAsyncThunk(
  "admin/getAllOwnerVenues",
  async (ownerIds, { rejectWithValue }) => {
    const ownerIdsString = ownerIds?.join(',');
    try {
      const response = await axios.get(`/api/venues/allOwnerVenues/${ownerIdsString}`)
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch all Owner Venues"
      );
    }
  }
);

// Update owner request status
export const updateOwnerRequestStatus = createAsyncThunk(
  "admin/updateOwnerRequestStatus",
  async ({ requestId, status }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/admin/venue-request/status/${requestId}`, { status });
      dispatch(showMessage({ message: "Venue Status Updated Successfully" }));
      return response.data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response?.data?.message || "Something went wrong",
          type: "error",
        })
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

const initialState = {
  ownerRequests: [],
  allOwnerVenues: [],
  loading: false,
  error: null,
  success: false,
  statsLoading: false,
  ownersLoading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Owner requests
      .addCase(fetchOwnerRequests.pending, (state) => {
        state.ownersLoading = true;
        state.error = null;
      })
      .addCase(fetchOwnerRequests.fulfilled, (state, action) => {
        state.ownersLoading = false;
        state.ownerRequests = action.payload;
      })
      .addCase(fetchOwnerRequests.rejected, (state, action) => {
        state.ownersLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllOwnerVenues.pending, (state) => {
        state.ownersLoading = true;
        state.error = null;
      })
      .addCase(getAllOwnerVenues.fulfilled, (state, action) => {
        state.ownersLoading = false;
        state.allOwnerVenues = action.payload;
      })
      .addCase(getAllOwnerVenues.rejected, (state, action) => {
        state.ownersLoading = false;
        state.error = action.payload;
      })
      // Update owner request status
      .addCase(updateOwnerRequestStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOwnerRequestStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateOwnerRequestStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
