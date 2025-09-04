import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { showMessage } from "../../utils/uiSlice";

export const getApplyAsOwner = createAsyncThunk(
    "adminApproval/getApplyAsOwner",
    async (applicationData, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post("api/admin/venue-request", applicationData);
            dispatch(showMessage({ message: `Request ${status}`, type: "success" }));
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
            .addCase(getApplyAsOwner.pending, (state) => {
                state.loading = true;
            })
            .addCase(getApplyAsOwner.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(getApplyAsOwner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = adminApprovalSlice.actions;

export default adminApprovalSlice.reducer;
