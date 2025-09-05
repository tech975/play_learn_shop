import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { showMessage } from "../../utils/uiSlice";

// export const getApplyAsOwner = createAsyncThunk(
//     "adminApproval/getApplyAsOwner",
//     async (applicationData, { dispatch, rejectWithValue }) => {
//         try {
//             const response = await axios.post("api/admin/venue-request", applicationData);
//             dispatch(showMessage({ message: `Request ${status}`, type: "success" }));
//             return response.data;
//         } catch (error) {
//             dispatch(
//                 showMessage({
//                     message: error.response?.data?.message || "Something went wrong",
//                     type: "error",
//                 })
//             );
//             return rejectWithValue(error.response?.data);
//         }
//     }
// );

export const fetchPendingOwnerRequests = createAsyncThunk(
    "adminApproval/fetchPendingOwnerRequests",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("api/admin/venue-request/pending");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const updateOwnerRequestStatus = createAsyncThunk(
    "adminApproval/updateOwnerRequestStatus",
    async ({ requestId, status }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.put(`api/admin/venue-request/status/${requestId}`, { status });
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

// Slice for admin approval requests
const adminApprovalSlice = createSlice({
    name: "adminApproval",
    initialState: {
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateOwnerRequestStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOwnerRequestStatus.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateOwnerRequestStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPendingOwnerRequests.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPendingOwnerRequests.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(fetchPendingOwnerRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = adminApprovalSlice.actions;

export default adminApprovalSlice.reducer;
