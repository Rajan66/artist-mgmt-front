"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  useGetAdminArtistAlbumsStats,
  useGetManagerArtistAlbumsStats,
} from "@/features/dashboard/hooks/use-queries";
import { getUser } from "@/utils/get-user";

interface AlbumsPerArtistChartProps {
  className?: string;
}

const AlbumsPerArtistChart = ({ className }: AlbumsPerArtistChartProps) => {
  const user = getUser();
  const { data } =
    user?.role === "artist_manager"
      ? useGetManagerArtistAlbumsStats(user?.id)
      : useGetAdminArtistAlbumsStats();

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
          dataKey="artist_name"
          tickLine={false}
          axisLine={false}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
        <Bar dataKey="albums" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </div>
  );
};
export default AlbumsPerArtistChart;
