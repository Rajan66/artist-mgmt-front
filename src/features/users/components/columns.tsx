"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
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
import { cn } from "@/utils/response";

import {
  hardDeleteUserProfile,
  softDeleteUserProfile,
  unbanUserProfile,
} from "../actions/user.action";
import { TManager } from "../types/user-profile";

export const columns: ColumnDef<TManager>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.user?.email}</div>,
  },
  { accessorKey: "first_name", header: "First Name" },
  {
    accessorKey: "last_name",
    header: "Last name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <div className="rounded-xl bg-primary/10 w-fit py-1 px-3">
        {row.original.gender === "M"
          ? "Male"
          : row.original.gender === "F"
            ? "Female"
            : "Others"}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.original.user?.role.toString()}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.original.user?.is_active.toString()}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const manager = row.original;
      const router = useRouter();
      const queryClient = useQueryClient();

      const { mutate, isPending: Deleting } = useMutation({
        mutationFn: hardDeleteUserProfile,
        onSuccess: () => {
          toast.success("Manager deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["userProfiles"] });
        },
      });

      const { mutate: ban, isPending: isBanning } = useMutation({
        mutationFn: softDeleteUserProfile,
        onSuccess: () => {
          toast.success("Manager banned successfully");
          queryClient.invalidateQueries({ queryKey: ["userProfiles"] });
        },
      });

      const { mutate: unban, isPending: isUnbanning } = useMutation({
        mutationFn: unbanUserProfile,
        onSuccess: () => {
          toast.success("Manager unbanned successfully");
          queryClient.invalidateQueries({ queryKey: ["userProfiles"] });
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
                navigator.clipboard?.writeText(manager?.user?.email.toString())
              }
            >
              Copy manager email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/managers/detail/${manager?.id}`)}
            >
              View details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(`/managers/${manager?.user?.id}`)}
            >
              Edit manager
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  {Deleting ? "Deleting..." : "Delete manager"}
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete manager?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this manager? This will also
                    delete all the artist associated with the manager!!! You can
                    choose to ban them instead!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => mutate(manager?.id)}
                    disabled={Deleting}
                    className={cn(buttonVariants({ variant: "destructive" }))}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  {!row.original?.user?.is_active
                    ? isUnbanning
                      ? "Unbanning..."
                      : "Unban manager"
                    : isBanning
                      ? "Banning..."
                      : "Ban manager"}
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Ban manager?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to ban this manager?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      if (manager?.user?.is_active) {
                        ban(manager?.id);
                      } else {
                        unban(manager?.id);
                      }
                    }}
                    disabled={isBanning}
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
