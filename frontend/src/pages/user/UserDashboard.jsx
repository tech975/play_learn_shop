import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import HeroSlider from '../public/HeroSlider';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SummaryCards from '../../components/dashboardComponents/SummaryCard';
import Charts from '../../components/dashboardComponents/Charts';
import ActivityTable from '../../components/dashboardComponents/ActivityTable';
import UpcomingEvents from '../../components/dashboardComponents/UpcomingEvents';
import Bargraph from '../../components/dashboardComponents/Bargraph';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const UserDashboard = () => {
  // const user = JSON.parse(localStorage.getItem("user")) || { name: "Player", role: "user" };
  const [viewType, setViewType] = useState("turf");

  // dummy data
  const turfSummary = [
    { title: "Total Bookings", value: 12 },
    { title: "Upcoming Matches", value: 3 },
    { title: "Cancelled", value: 1 },
    { title: "Total Hours", value: 34 }
  ];

  const coachingSummary = [
    { title: "Sessions Attended", value: 8 },
    { title: "Progress (%)", value: "70%" },
    { title: "Upcoming Sessions", value: 2 },
  ];

  const bookingsTrend = [
    { month: "Jan", bookings: 2 },
    { month: "Feb", bookings: 3 },
    { month: "Mar", bookings: 4 },
    { month: "Apr", bookings: 3 },
  ];

  const progressTrend = [
    { month: "Jan", progress: 30 },
    { month: "Feb", progress: 40 },
    { month: "Mar", progress: 55 },
    { month: "Apr", progress: 70 },
  ];

  const turfPreference = [
    { name: "Football", value: 6 },
    { name: "Cricket", value: 4 },
    { name: "Tennis", value: 2 },
  ];

  const expenseDistribution = [
    { name: "Coaching", value: 60 },
    { name: "Equipment", value: 25 },
    { name: "Others", value: 15 },
  ];

  const upcomingEvents = [
    { title: "Turf Booking - Football", date: "20 Aug, 5:00 PM", status: "Confirmed" },
    { title: "Coaching Session", date: "22 Aug, 7:00 AM", status: "Scheduled" },
  ];

  const activities = [
    { action: "Booked Turf - Cricket", date: "10 Aug", status: "Completed" },
    { action: "Cancelled Session", date: "12 Aug", status: "Cancelled" },
    { action: "Joined Coaching", date: "15 Aug", status: "Completed" },
  ];

  return (
    <div>
      <Navbar />
      <div className="pt-16 px-5 sm:px-24">
        <HeroSlider />
       {/* Welcome */}
        {/* <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg mb-6">
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user?.name || "Player"} 👋
          </h1>
          <p className="opacity-90 text-white">Role: {user?.role}</p>
        </div> */}

        {/* Toggle View */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setViewType("turf")}
            className={`px-4 py-2 rounded-lg ${
              viewType === "turf" ? "bg-green-600/70 text-white/70" : "bg-gray-200/70"
            }`}
          >
            Turf Analytics
          </button>
          <button
            onClick={() => setViewType("coaching")}
            className={`px-4 py-2 rounded-lg ${
              viewType === "coaching" ? "bg-green-600/70 text-white/70" : "bg-gray-200/70"
            }`}
          >
            Coaching Analytics
          </button>
        </div>

        {/* Summary */}
        <SummaryCards
          data={viewType === "turf" ? turfSummary : coachingSummary}
        />

        <Bargraph
          title="Monthly Bookings Overview"
          data={bookingsTrend}
          dataKey="bookings"
          label="Bookings"
        />

        {/* Charts */}
        <Charts
          viewType={viewType}
          bookingsTrend={bookingsTrend}
          progressTrend={progressTrend}
          turfPreference={turfPreference}
          expenseDistribution={expenseDistribution}
        />

        <div className="sm:flex flex-col sm:flex-row justify-between items-start gap-5">
          {/* Upcoming Sessions */}
          <div className="flex-1">
            <UpcomingEvents events={upcomingEvents} />
          </div>

          {/* Activity Table */}
          <div className="flex-1">
            <ActivityTable activities={activities} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserDashboard;
