import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bookingsReducer from '../features/bookings/bookingSlice';
import venueReducer from '../features/venues/venueSlice';
import coachReducer from '../features/coach/coachBookingSlice';
import uiReducer from '../utils/uiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  bookings: bookingsReducer,
  venues: venueReducer,
  coaches: coachReducer,
  ui: uiReducer,
});

export default rootReducer;
