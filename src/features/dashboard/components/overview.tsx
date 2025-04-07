"use client";

import { LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import { ResponsiveContainer } from "recharts";

import {
  AlbumsPerArtistChart,
  GenreDistributionChart,
  MonthlySongsChart,
  SongsPerArtistChart,
} from "@/components/charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUser } from "@/utils/get-user";

import { useGetAdminStats, useGetManagerStats } from "../hooks/use-queries";

const Overview = () => {
  const user = getUser();
  const isManager = user?.role === "artist_manager";

  const { data: stats } = isManager
    ? useGetManagerStats(user?.id)
    : useGetAdminStats();

  const getDiffText = (diff?: number) => {
    if (diff == null) return null;

    const isPositive = diff > 0;
    const displayDiff = `${isPositive ? "+" : ""}${diff}`;
    const arrow = isPositive ? <LuTrendingUp /> : <LuTrendingDown />;
    const colorClass = isPositive ? "text-green-500" : "text-red-500";

    return (
      <span className={`text-xs ${colorClass}`}>
        {arrow} {displayDiff} from last week
      </span>
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Artists
              </CardTitle>
              <CardDescription>All registered artists</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.data?.total_artists}
              </div>
              <p className="text-xs text-muted-foreground">
                {getDiffText(stats?.data.artist_diff)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Songs</CardTitle>
              <CardDescription>All released songs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.data?.total_songs}
              </div>
              <p className="text-xs text-muted-foreground">
                {getDiffText(stats?.data.song_diff)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Albums
              </CardTitle>
              <CardDescription>All released albums</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.data?.total_albums}
              </div>
              <p className="text-xs text-muted-foreground">
                {getDiffText(stats?.data.album_diff)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {isManager ? "Total Genres" : "Total Managers"}
              </CardTitle>
              <CardDescription>
                {isManager ? "Unique music genres" : "All registered managers"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isManager
                  ? stats?.data?.total_genres
                  : stats?.data?.total_managers}
              </div>
              <p className="text-xs text-muted-foreground">
                {!isManager && getDiffText(stats?.data.manager_diff)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Songs Released Monthly</CardTitle>
              <CardDescription>
                Number of songs released per month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <MonthlySongsChart />
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Genre Distribution</CardTitle>
              <CardDescription>Distribution of songs by genre</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <GenreDistributionChart />
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* More Charts */}
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Songs per Artist</CardTitle>
              <CardDescription>
                Top 10 artists by number of songs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <SongsPerArtistChart />
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Albums per Artist</CardTitle>
              <CardDescription>
                Top 10 artists by number of albums
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AlbumsPerArtistChart />
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Artist Overview</CardTitle>
              <CardDescription>
                List of top artists and their stats
              </CardDescription>
            </CardHeader>
            <CardContent>{/* <ArtistTable /> */}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recently Released Songs</CardTitle>
              <CardDescription>
                Latest songs released on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>{/* <RecentSongsTable /> */}</CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Overview;
