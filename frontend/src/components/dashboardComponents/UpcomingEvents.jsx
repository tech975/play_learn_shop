// src/components/dashboard/UpcomingEvents.jsx
import React from "react";

const UpcomingEvents = ({ events }) => {
  return (
    <div className="w-full bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-md mb-6">
      <h2 className="text-md font-semibold mb-2">Upcoming Sessions</h2>
      <ul className="space-y-2">
        {events.map((event, idx) => (
          <li
            key={idx}
            className="p-3 border rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
            <span className="px-3 py-1 text-xs rounded-lg bg-green-100 text-green-700">
              {event.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
