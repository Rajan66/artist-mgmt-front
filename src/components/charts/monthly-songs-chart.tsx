"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

interface MonthlySongsChartProps {
  className?: string;
}

const MonthlySongsChart = ({ className }: MonthlySongsChartProps) => {
  const data = [
    { month: "Jan", songs: 24 },
    { month: "Feb", songs: 18 },
    { month: "Mar", songs: 32 },
    { month: "Apr", songs: 27 },
    { month: "May", songs: 45 },
    { month: "Jun", songs: 38 },
    { month: "Jul", songs: 52 },
    { month: "Aug", songs: 41 },
    { month: "Sep", songs: 35 },
    { month: "Oct", songs: 29 },
    { month: "Nov", songs: 33 },
    { month: "Dec", songs: 48 },
  ];

  return (
    <div className={className}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Line
          type="monotone"
          dataKey="songs"
          stroke="var(--chart-3)"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
      </LineChart>
    </div>
  );
};
export default MonthlySongsChart;
