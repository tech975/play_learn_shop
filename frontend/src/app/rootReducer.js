import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bookingsReducer from '../features/bookings/bookingSlice';
import venueReducer from '../features/venues/venueSlice';
import coachReducer from '../features/coach/coachBookingSlice';
import uiReducer from '../utils/uiSlice';
import adminReducer from '../features/admin/adminSlice';
// import adminApprovalSlice from '../features/adminApprovalRequest/adminApprovalSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  bookings: bookingsReducer,
  venues: venueReducer,
  coaches: coachReducer,
  ui: uiReducer,
  // adminRequests: adminApprovalSlice,
  admin: adminReducer,
});

export default rootReducer;
