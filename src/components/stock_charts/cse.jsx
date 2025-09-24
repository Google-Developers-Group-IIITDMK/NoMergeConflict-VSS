import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

/**
 * CseStockChart
 * 
 * Props:
 *  data: Array of objects, each with { time: number, value: number }
 * 
 * Example:
 *  const sampleData = [
 *    { time: 0, value: 100 },
 *    { time: 1, value: 102 },
 *    { time: 2, value: 101 },
 *  ];
 *  <CseStockChart data={sampleData} />
 */
export default function CseStockChart({ data }) {
  if (!data || !Array.isArray(data)) {
    return <p>No data provided</p>;
  }

  // Optional: limit the data length to prevent overcrowding
  const MAX_POINTS = 50; 
  const chartData = data.length > MAX_POINTS ? data.slice(-MAX_POINTS) : data;

  return (
    <LineChart width={600} height={300} data={chartData}>
      <XAxis 
        dataKey="time" 
        label={{ value: "Time (s)", position: "insideBottomRight", offset: 0 }} 
      />
      <YAxis 
        label={{ value: "Stock Price", angle: -90, position: "insideLeft" }} 
      />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#8884d8" dot={true} />
    </LineChart>
  );
}
