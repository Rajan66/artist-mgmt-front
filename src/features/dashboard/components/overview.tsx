"use client";

import {
  Disc,
  LayoutDashboard,
  Library,
  FileMusicIcon as MusicNote,
  Users,
} from "lucide-react";
import { ResponsiveContainer } from "recharts";

import {
  AlbumsPerArtistChart,
  GenreDistributionChart,
  MonthlySongsChart,
  SongsPerArtistChart,
} from "@/components/charts";
// import { ArtistTable } from "@/components/tables/artist-table";
// import { RecentSongsTable } from "@/components/tables/recent-songs-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Overview = () => {
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
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                +5 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Songs</CardTitle>
              <CardDescription>All released songs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,482</div>
              <p className="text-xs text-muted-foreground">
                +24 from last month
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
              <div className="text-2xl font-bold">238</div>
              <p className="text-xs text-muted-foreground">
                +3 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Genres
              </CardTitle>
              <CardDescription>Unique music genres</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                +1 from last month
              </p>
            </CardContent>
          </Card>
        </div>
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
                Latest songs released in the platform
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
