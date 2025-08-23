// src/components/dashboard/Charts.jsx
import React from "react";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Charts = ({ viewType, bookingsTrend, progressTrend, turfPreference, expenseDistribution }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
      {/* Line Chart */}
      <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-md">
        <h2 className="text-md font-semibold mb-2">Trend</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={viewType === "turf" ? bookingsTrend : progressTrend}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={viewType === "turf" ? "bookings" : "progress"}
              stroke="#10B981"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="w-full bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-md">
        <h2 className="text-md font-semibold mb-2">Distribution</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={viewType === "turf" ? turfPreference : expenseDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {(viewType === "turf" ? turfPreference : expenseDistribution).map(
                (_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                )
              )}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
