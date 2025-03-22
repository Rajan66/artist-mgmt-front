"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { useQueryClient, useMutation } from "@tanstack/react-query";
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
import {
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { TArtist } from "../types/artists";
import { deleteArtist } from "@/features/artists/actions/artists.action";

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
            <Button variant="ghost" className="h-8 w-8 p-0">
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
