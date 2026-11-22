import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#3b82f6"];

const pieData = [
  { name: "Stalk & Straw", value: 54.75 },
  { name: "Chaff Waste", value: 30.15 },
  { name: "Bran & Husk", value: 14.9 }
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15, 23, 42, 0.9)',
        color: '#ffffff',
        padding: '8px 14px',
        borderRadius: '10px',
        fontSize: '13px',
        fontWeight: 600,
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
      }}>
        <span>{`${payload[0].name}: ${payload[0].value}%`}</span>
      </div>
    );
  }
  return null;
};

const Piechart = () => {
  return (
    <div style={{ width: '100%', height: 260, minWidth: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={85}
            paddingAngle={4}
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            formatter={(value) => <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 600 }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Piechart;
