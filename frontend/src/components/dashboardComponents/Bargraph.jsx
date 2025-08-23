import React from "react";
import { BarChart } from "@mui/x-charts";

const Bargraph = ({ title, data, dataKey, label }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-md mb-6">
      <h2 className="text-md font-semibold mb-2">{title}</h2>
      <BarChart
        height={300}
        // colors={'#fa456'}
        xAxis={[
          { data: data.map((d) => d.month), scaleType: "band", colorMap: { type: 'piecewise', thresholds: [50, 100], colors: ['green', 'orange', 'red'] } },
        ]}
        series={[
          { data: data.map((d) => d[dataKey]), label: label },
        ]}
      />
    </div>
  );
};

export default Bargraph;
