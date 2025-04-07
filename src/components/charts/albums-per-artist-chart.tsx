"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface AlbumsPerArtistChartProps {
  className?: string;
}

const AlbumsPerArtistChart = ({ className }: AlbumsPerArtistChartProps) => {
  const data = [
    { artist: "Taylor Swift", albums: 12 },
    { artist: "Drake", albums: 9 },
    { artist: "Ed Sheeran", albums: 7 },
    { artist: "Ariana Grande", albums: 6 },
    { artist: "The Weeknd", albums: 5 },
    { artist: "Billie Eilish", albums: 4 },
    { artist: "Post Malone", albums: 4 },
    { artist: "Dua Lipa", albums: 3 },
    { artist: "Justin Bieber", albums: 6 },
    { artist: "BTS", albums: 8 },
  ];

  return (
    <div className={className}>
      <BarChart
        width={500}
        height={300}
        data={data}
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
        <Bar dataKey="albums" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </div>
  );
};
export default AlbumsPerArtistChart;
