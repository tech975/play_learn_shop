// src/components/dashboard/ActivityTable.jsx
import React from "react";

const ActivityTable = ({ activities }) => {
  return (
    <div className="w-full bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-md">
      <h2 className="text-md font-semibold mb-2">Recent Activities</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Activity</th>
            <th className="py-2">Date</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, idx) => (
            <tr key={idx} className="border-b">
              <td className="py-2">{activity.action}</td>
              <td className="py-2">{activity.date}</td>
              <td
                className={`py-2 ${
                  activity.status === "Completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {activity.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
