import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// Fetch dashboard stats
export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const [usersResponse, ownersResponse] = await Promise.all([
        axios.get("/api/auth/users"),
        axios.get("/api/admin/venue-request/pending"),
      ]);

      return {
        users: usersResponse.data?.length || 0,
        owners: ownersResponse.data?.length || 0,
        coaches: 0, // Mock data for now
        revenue: 0, // Mock data for now
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch dashboard stats"
      );
    }
  }
);

// Fetch all users
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/auth/users");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// Fetch owner requests
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

// Update owner request status
export const updateOwnerRequestStatus = createAsyncThunk(
  "admin/updateOwnerRequestStatus",
  async ({ requestId, status }, { rejectWithValue }) => {
    try {
      await axios.put(`/api/admin/venue-request/status/${requestId}`, { status });
      return { requestId, status };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update owner request status"
      );
    }
  }
);

const initialState = {
  dashboardStats: {
    users: 0,
    owners: 0,
    coaches: 0,
    revenue: 0,
  },
  users: [],
  ownerRequests: [],
  coaches: [],
  loading: false,
  error: null,
  statsLoading: false,
  usersLoading: false,
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
      // Dashboard stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.statsLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.error = action.payload;
      })
      // Users
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.error = action.payload;
      })
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
      // Update owner request status
      .addCase(updateOwnerRequestStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOwnerRequestStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { requestId, status } = action.payload;
        const request = state.ownerRequests.find(
          (req) => req._id === requestId
        );
        if (request) {
          request.status = status;
        }
      })
      .addCase(updateOwnerRequestStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
