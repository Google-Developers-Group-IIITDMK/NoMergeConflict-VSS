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

const MechStockChart = React.memo(({ data }) => {
  const MAX_VISIBLE_POINTS = 50;

  // const chartData =
  //   data.length > MAX_VISIBLE_POINTS ? data.slice(-MAX_VISIBLE_POINTS) : data;
  const chartData = data;
  return (
    <div style={{ width: "95%", height: 400, border: "1px solid #ccc" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
          <Line
            type="linear"
            dataKey="value"
            stroke="#4caf50"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default React.memo(
  MechStockChart,
  (prevProps, nextProps) => prevProps.data.length === nextProps.data.length
);
