import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 600 },
  { name: "Wed", value: 300 },
  { name: "Thu", value: 800 },
  { name: "Fri", value: 500 },
];

const StockChart = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md h-64">
      <h3 className="font-semibold mb-2">Portfolio Performance</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
