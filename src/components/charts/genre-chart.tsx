"use client";

import { Cell, Pie, PieChart } from "recharts";

interface GenreDistributionChartProps {
  className?: string;
}

const GenreDistributionChart = ({ className }: GenreDistributionChartProps) => {
  const data = [
    { name: "Pop", value: 35 },
    { name: "Hip Hop", value: 25 },
    { name: "Rock", value: 15 },
    { name: "R&B", value: 10 },
    { name: "Electronic", value: 8 },
    { name: "Other", value: 7 },
  ];

  const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--primary)",
  ];

  return (
    <div className={className}>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};
export default GenreDistributionChart;
