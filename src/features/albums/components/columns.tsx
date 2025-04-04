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
import { deleteAlbum } from "@/features/albums/actions/album.action";
import { cn } from "@/utils/response";

import { TAlbum } from "../types/album.type";

export const columns: ColumnDef<TAlbum>[] = [
  {
    accessorKey: "profile_image",
    header: "",
    cell: ({ row }) => (
      <div>
        <Image
          src={
            row.original.cover_image
              ? `${api_image}/${row.original.cover_image}`
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
    cell: ({ row }) => row.original.artist.name,
  },
  {
    accessorKey: "release_date",
    header: "Release Date",
  },
  {
    accessorKey: "album_type",
    header: "Album Type",
  },
  {
    accessorKey: "total_tracks",
    header: "Total Tracks",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const album = row.original;
      const router = useRouter();
      const queryClient = useQueryClient();
      const { mutate, isPending: Deleting } = useMutation({
        mutationFn: deleteAlbum,
        onSuccess: () => {
          toast.success("Album deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["albums"] });
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
                navigator.clipboard?.writeText(album.title.toString())
              }
            >
              Copy album title
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/albums/detail/${album.id}`)}
            >
              View details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(`/albums/${album.id}`)}
            >
              Edit album
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  {Deleting ? "Deleting..." : "Delete album"}
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete album?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this album? This will also
                    delete all the songs inside the album!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => mutate(album.id)}
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
