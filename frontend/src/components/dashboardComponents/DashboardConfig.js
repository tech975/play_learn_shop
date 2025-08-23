export const dashboardConfig = {
  turf: {
    summary: [
      { title: "Total Bookings", value: 12 },
      { title: "Upcoming", value: 2 },
      { title: "Hours Played", value: 38 },
      { title: "Total Spent", value: "₹4,500" },
    ],
    charts: {
      bookingsTrend: [
        { month: "Jan", bookings: 2 },
        { month: "Feb", bookings: 4 },
        { month: "Mar", bookings: 3 },
      ],
      turfPreference: [
        { name: "5v5", value: 60 },
        { name: "7v7", value: 30 },
        { name: "11v11", value: 10 },
      ],
    },
  },

  coaching: {
    summary: [
      { title: "Sessions Joined", value: 8 },
      { title: "Upcoming", value: 1 },
      { title: "Progress %", value: "65%" },
      { title: "Total Spent", value: "₹2,000" },
    ],
    charts: {
      progress: [
        { month: "Jan", progress: 20 },
        { month: "Feb", progress: 40 },
        { month: "Mar", progress: 65 },
      ],
      expense: [
        { name: "Football", value: 70 },
        { name: "Cricket", value: 20 },
        { name: "Others", value: 10 },
      ],
    },
  },
};
