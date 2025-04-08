"use client";

import { Cell, Pie, PieChart } from "recharts";

import {
  useGetAdminGenreStats,
  useGetManagerGenreStats,
} from "@/features/dashboard/hooks/use-queries";
import { getUser } from "@/utils/get-user";

interface GenreDistributionChartProps {
  className?: string;
}

const GenreDistributionChart = ({ className }: GenreDistributionChartProps) => {
  const user = getUser();
  const { data } =
    user?.role === "artist_manager"
      ? useGetManagerGenreStats(user?.id)
      : useGetAdminGenreStats();

  const COLORS = [
    "var(--chart-2)",
    "var(--chart-1)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--primary)",
  ];

  return (
    <div className={className}>
      {data?.data?.length > 0 ? (
        <PieChart width={400} height={300}>
          <Pie
            data={data?.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="values"
            nameKey="genre"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {/*//@ts-ignore*/}
            {data?.data.map((_, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      ) : (
        <div className="justify-center items-center flex h-[200px]">
          <h2 className="opacity-90">No genre data available yet.... </h2>
        </div>
      )}
    </div>
  );
};
export default GenreDistributionChart;
