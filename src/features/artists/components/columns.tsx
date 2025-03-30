"use client";

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
import { deleteArtist } from "@/features/artists/actions/artist.action";
import { cn } from "@/utils/response";

import { TArtist } from "../types/artist.type";

export const columns: ColumnDef<TArtist>[] = [
  {
    accessorKey: "name",
    header: "Artist Name",
  },
  { accessorKey: "first_name", header: "First Name" },
  {
    accessorKey: "last_name",
    header: "Last name",
  },

  {
    accessorKey: "first_release_year",
    header: "First release year",
  },

  {
    accessorKey: "no_of_albums_released",
    header: "Album count",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const artist = row.original;
      const router = useRouter();
      const queryClient = useQueryClient();
      const { mutate, isPending: Deleting } = useMutation({
        mutationFn: deleteArtist,
        onSuccess: () => {
          toast.success("Artist deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["artists"] });
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard?.writeText(artist.name.toString())
              }
            >
              Copy artist name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(`/artists/${artist.id}`)}
            >
              Edit artist
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  {Deleting ? "Deleting..." : "Delete Artist"}
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete artist?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this artist?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => mutate(artist.id)}
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
