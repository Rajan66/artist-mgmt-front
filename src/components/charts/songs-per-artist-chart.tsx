"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  useGetAdminArtistSongsStats,
  useGetManagerArtistSongsStats,
} from "@/features/dashboard/hooks/use-queries";
import { getUser } from "@/utils/get-user";

interface SongsPerArtistChartProps {
  className?: string;
}

const SongsPerArtistChart = ({ className }: SongsPerArtistChartProps) => {
  const user = getUser();
  const { data } =
    user?.role === "artist_manager"
      ? useGetManagerArtistSongsStats(user?.id)
      : useGetAdminArtistSongsStats();

  return (
    <div className={className}>
      <BarChart
        width={500}
        height={300}
        data={data?.data}
        margin={{ top: 5, right: 5, left: 5, bottom: 40 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="artist"
          tickLine={false}
          axisLine={false}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis tickLine={false} axisLine={false} />
        <Bar dataKey="songs" fill="var(--chart-4)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </div>
  );
};
export default SongsPerArtistChart;
