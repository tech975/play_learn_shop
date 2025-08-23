// src/components/dashboard/SummaryCards.jsx
import React from "react";

const SummaryCards = ({ data }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {data.map((card, idx) => (
        <div
          key={idx}
          className="bg-white/70 backdrop-blur-md shadow-md rounded-2xl p-4 text-center hover:scale-105 transition"
        >
          <h2 className="text-lg font-bold text-gray-900">{card.value}</h2>
          <p className="text-gray-500 text-sm">{card.title}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
