"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api_image } from "@/constants/api";
import { TSong } from "@/features/songs/types/song.type";

export const columns: ColumnDef<TSong>[] = [
  {
    accessorKey: "cover_image",
    header: "",
    cell: ({ row }) => (
      <div>
        <Image
          src={
            row.original.album?.cover_image
              ? `${api_image}/${row.original.album?.cover_image}`
              : `/images/album.png`
          }
          alt="Cover Image"
          width={80}
          height={50}
          className="rounded-lg w-10 h-10"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "artist",
    header: "Artist",
    cell: ({ row }) => row.original.album?.artist.name,
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const song = row.original;
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard?.writeText(song.title.toString())
              }
            >
              Copy song title
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                router.push(`/artists/detail/${song?.album?.artist?.id}`)
              }
            >
              View artist
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/albums/detail/${song?.album?.id}`)}
            >
              View album
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
