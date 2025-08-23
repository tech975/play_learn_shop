// Seed script for Users, Venues, Coaches, etc.
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const Venue = require('./models/Venue');
const Slot = require('./models/Slot');
const Booking = require('./models/Booking');
const Earnings = require('./models/Earnings');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  await mongoose.connect(MONGO_URI);
  await User.deleteMany({});
  await Venue.deleteMany({});
  await Slot.deleteMany({});
  await Booking.deleteMany({});
  await Earnings.deleteMany({});


  // Add sample users with hashed passwords
  const plainPassword = 'password123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  const users = await User.insertMany([
    { name: 'User One', email: 'user1@example.com', password: hashedPassword, role: 'user' },
    { name: 'Owner One', email: 'owner1@example.com', password: hashedPassword, role: 'owner' },
    { name: 'Coach One', email: 'coach1@example.com', password: hashedPassword, role: 'coach' },
    { name: 'Admin', email: 'admin@example.com', password: hashedPassword, role: 'admin' },
  ]);

  // Add sample venues
  const owner = users.find(u => u.role === 'owner');
  const coach = users.find(u => u.role === 'coach');
  const venue1 = await Venue.create({
    name: 'Play Arena',
    location: 'Bangalore',
    sport: 'Football',
    price: 1000,
    owner: owner._id,
    status: 'approved',
    slots: []
  });
  const venue2 = await Venue.create({
    name: 'Sports Hub',
    location: 'Mumbai',
    sport: 'Cricket',
    price: 1200,
    owner: owner._id,
    status: 'approved',
    slots: []
  });

  // Add sample slots
  const slot1 = await Slot.create({
    venue: venue1._id,
    date: new Date(),
    startTime: '10:00',
    endTime: '11:00',
    isBooked: false,
    coach: coach._id
  });
  const slot2 = await Slot.create({
    venue: venue2._id,
    date: new Date(),
    startTime: '12:00',
    endTime: '13:00',
    isBooked: false,
    coach: coach._id
  });

  // Update venues with slots
  venue1.slots.push(slot1._id);
  venue2.slots.push(slot2._id);
  await venue1.save();
  await venue2.save();

  // Add sample booking
  const user = users.find(u => u.role === 'user');
  const booking1 = await Booking.create({
    user: user._id,
    venue: venue1._id,
    slot: slot1._id,
    coach: coach._id,
    status: 'pending',
    paymentStatus: 'paid',
    amount: 1000
  });

  // Mark slot as booked
  slot1.isBooked = true;
  await slot1.save();

  console.log('Seed data inserted!');
  process.exit();
}

seed();
