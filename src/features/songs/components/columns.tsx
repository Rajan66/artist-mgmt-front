"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-toastify";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api_image } from "@/constants/api";
import { deleteSong } from "@/features/songs/actions/song.action";
import { cn } from "@/utils/response";

import { TSong } from "../types/song.type";

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
    accessorKey: "album",
    header: "Album",
    cell: ({ row }) => row.original.album?.title,
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
    accessorKey: "release_date",
    header: "Release Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const song = row.original;
      const router = useRouter();
      const queryClient = useQueryClient();

      const { mutate, isPending: Deleting } = useMutation({
        mutationFn: deleteSong,
        onSuccess: () => {
          toast.success("Song deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["songs"] });
          queryClient.invalidateQueries({
            queryKey: ["artistSongs", song.album?.artist.id],
          });
        },
      });

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
            <DropdownMenuItem onClick={() => router.push(`/songs/${song.id}`)}>
              Edit song
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  {Deleting ? "Deleting..." : "Delete song"}
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete song?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this song?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => mutate(song.id)}
                    disabled={Deleting}
                    className={cn(buttonVariants({ variant: "destructive" }))}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
