"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGetItems } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import { getUser } from "@/utils/get-user";

import { TItem } from "../types/sidebar.type";

const SidebarItems = () => {
  const user = getUser();
  let pathname = usePathname();
  pathname =
    user?.role === "artist" && pathname.startsWith("/artists/detail/")
      ? "/"
      : pathname;
  const items = useGetItems();
  return (
    <SidebarMenu className="mt-2 space-y-4 overflow-hidden">
      {items.map((item: TItem) => (
        <SidebarMenuItem key={item.title} className="w-full">
          <SidebarMenuButton
            asChild
            size="default"
            isActive={
              item.url === "/"
                ? pathname === "/"
                : pathname.startsWith(item.url)
            }
            className={cn(
              `text-lg transition-all group-data-[collapsible=icon]:h-full! group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:p-2!`,
              (
                item.url === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.url)
              )
                ? "opacity-100"
                : "opacity-75"
            )}
          >
            <div className="h-full w-full items-center justify-start">
              <Link
                href={item.url}
                className="flex h-full w-full items-center justify-start gap-6"
              >
                <item.icon size={30} className="shrink-0" />{" "}
                {/* Ensure icons are visible */}
                <p className="font-medium">{item.title}</p>
              </Link>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default SidebarItems;
