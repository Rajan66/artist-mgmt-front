"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { items } from "@/constants/sidebar";
import { cn } from "@/lib/utils";

const SidebarItems = () => {
  const pathname = usePathname();
  return (
    <SidebarMenu className="mt-2 space-y-4 overflow-hidden">
      {items.map((item) => (
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
              pathname.startsWith(item.url) ? "opacity-100" : "opacity-75"
            )}
          >
            <div className="h-full w-full items-center justify-start">
              <Link
                href={item.url}
                className="flex h-full items-center justify-start gap-6"
              >
                <item.icon size={30} />
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
