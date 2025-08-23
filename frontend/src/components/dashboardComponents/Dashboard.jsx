import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { dashboardConfig } from "./DashboardConfig";
import SummaryCards from "./SummaryCards";
import Charts from "./Charts";
import UpcomingSection from "./UpcomingEvents";
import ActivityList from "./ActivityTable";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest", role: "user" };
  const [viewType, setViewType] = useState("turf");

  // Dummy activity data
  const activityData = [
    { name: "Turf Booking 1", date: "2025-08-20", status: "Completed" },
    { name: "Turf Booking 2", date: "2025-08-22", status: "Upcoming" },
  ];

  const upcomingEvent = { name: "Football Turf", date: "2025-08-22", time: "5:00 PM" };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4 sm:p-6">
        <h1 className="text-xl font-bold mb-2">Welcome, {user.name} 👋</h1>
        <p className="text-gray-600 mb-4">Role: {user.role}</p>

        {/* View Switcher */}
        <select
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
          className="border rounded-md p-2 mb-4"
        >
          <option value="turf">Turf Dashboard</option>
          <option value="coaching">Coaching Dashboard</option>
        </select>

        {/* Dashboard Sections */}
        <SummaryCards cards={dashboardConfig[viewType].summary} />
        <Charts charts={dashboardConfig[viewType].charts} viewType={viewType} />
        <UpcomingSection upcoming={upcomingEvent} />
        <ActivityList data={activityData} viewType={viewType} />
      </div>
    </div>
  );
};

export default Dashboard;
