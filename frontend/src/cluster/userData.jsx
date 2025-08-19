// src/mock/users.js
export const mockUsers = [
  {
    id: 1,
    name: "User",
    email: "user@gmail.com",
    password: "user123",
    role: "user",
    bookings: [
      { id: 101, ground: "Greenfield Arena", date: "2025-08-20" },
      { id: 102, ground: "City Sports Complex", date: "2025-08-25" },
    ],
  },
  {
    id: 2,
    name: "Priya Mehta",
    email: "priya@example.com",
    password: "securePass456",
    role: "user",
    bookings: [
      { id: 103, ground: "Elite Turf", date: "2025-08-22" },
    ],
  },
  {
    id: 3,
    name: "Rohan Gupta",
    email: "rohan@example.com",
    password: "coachPass789",
    role: "coach",
    bookings: [
      { id: 201, session: "Cricket Training", date: "2025-08-21" },
      { id: 202, session: "Football Workshop", date: "2025-08-23" },
    ],
  },
  {
    id: 4,
    name: "Sneha Iyer",
    email: "sneha@example.com",
    password: "snehaPass321",
    role: "coach",
    bookings: [
      { id: 203, session: "Tennis Coaching", date: "2025-08-26" },
    ],
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram@example.com",
    password: "ownerPass654",
    role: "groundOwner",
    bookings: [
      { id: 301, ground: "Downtown Stadium", bookedBy: "Aarav Sharma" },
    ],
  },
  {
    id: 6,
    name: "Kavya Reddy",
    email: "kavya@example.com",
    password: "kavyaPass987",
    role: "groundOwner",
    bookings: [
      { id: 302, ground: "Sunshine Grounds", bookedBy: "Priya Mehta" },
    ],
  },
  {
    id: 7,
    name: "Anjali Verma",
    email: "anjali@example.com",
    password: "adminPass000",
    role: "admin",
    bookings: [], // Admin usually doesn’t book, they manage
  },
  {
    id: 8,
    name: "Devansh Joshi",
    email: "devansh@example.com",
    password: "devPass111",
    role: "user",
    bookings: [
      { id: 104, ground: "Greenfield Arena", date: "2025-08-27" },
    ],
  },
  {
    id: 9,
    name: "Meera Kulkarni",
    email: "meera@example.com",
    password: "meeraPass222",
    role: "coach",
    bookings: [
      { id: 204, session: "Yoga Training", date: "2025-08-28" },
    ],
  },
  {
    id: 10,
    name: "Sahil Kapoor",
    email: "sahil@example.com",
    password: "sahilPass333",
    role: "groundOwner",
    bookings: [
      { id: 303, ground: "Royal Sports Club", bookedBy: "Devansh Joshi" },
    ],
  },
];
