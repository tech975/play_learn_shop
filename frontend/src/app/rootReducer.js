import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bookingsReducer from '../features/bookings/bookingSlice';
import venueReducer from '../features/venues/venueSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  bookings: bookingsReducer,
  venues: venueReducer,
});

export default rootReducer;
