const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const adminVenueRoutes = require('./routes/admin/adminVenueRoutes');
const adminCoachRoutes = require('./routes/admin/adminCoachRoutes');
const venueRoutes = require('./routes/venueRoutes');
const slotRoutes = require('./routes/slotRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const earningsRoutes = require('./routes/earningsRoutes');
const coachRoutes = require('./routes/coach/coachRoutes');
const coachSlots = require('./routes/coach/coachSlotRoutes');
const coachScheduleRoutes = require('./routes/coach/coachScheduleRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', userRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/admin', adminVenueRoutes);
app.use('/api/admin', adminCoachRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/earnings', earningsRoutes);

// coach route
app.use('/api/coaches/schedules', coachScheduleRoutes);
app.use('/api/coaches/slots', coachSlots);
app.use('/api/coaches', coachRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('API is running');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // app.listen(PORT, '0.0.0.0', () => {
    //   console.log(`Server running on http://0.0.0.0:${PORT}`);
    // });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
