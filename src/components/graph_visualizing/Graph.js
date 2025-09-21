// src/components/stock_engine/Graph.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Graph = React.memo(({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickFormatter={(time) => new Date(time).toLocaleTimeString()}
        />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip
          labelFormatter={(time) => new Date(time).toLocaleTimeString()}
          formatter={(val) => `$${val.toFixed(2)}`}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#4caf50"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false} // prevents re-animating the line
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

// Only re-render when the data length changes (i.e., new point appended)
export default React.memo(Graph, (prevProps, nextProps) => {
  return prevProps.data.length === nextProps.data.length;
});
