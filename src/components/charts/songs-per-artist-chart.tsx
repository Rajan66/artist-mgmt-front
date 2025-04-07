"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface SongsPerArtistChartProps {
  className?: string;
}

const SongsPerArtistChart = ({ className }: SongsPerArtistChartProps) => {
  const data = [
    { artist: "Taylor Swift", songs: 120 },
    { artist: "Drake", songs: 95 },
    { artist: "Ed Sheeran", songs: 87 },
    { artist: "Ariana Grande", songs: 76 },
    { artist: "The Weeknd", songs: 72 },
    { artist: "Billie Eilish", songs: 65 },
    { artist: "Post Malone", songs: 58 },
    { artist: "Dua Lipa", songs: 52 },
    { artist: "Justin Bieber", songs: 48 },
    { artist: "BTS", songs: 45 },
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
        <Bar dataKey="songs" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </div>
  );
};
export default SongsPerArtistChart;
