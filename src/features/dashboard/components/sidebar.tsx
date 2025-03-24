"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "@/app/favicon.ico";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import SidebarItems from "./sidebar-items";

const DashboardSidebar = () => {
  const { state } = useSidebar();
  return (
    <Sidebar
      collapsible="icon"
      style={
        {
          "--sidebar-width-icon": "4rem",
        } as React.CSSProperties
      }
    >
      <Link href="/" className="flex items-center gap-4 p-3">
        <Image
          src={logo || "/placeholder.svg"}
          alt="VoxCloud logo"
          width={40}
          height={40}
        />
        {state === "expanded" && (
          <h2 className="text-lg font-semibold">VoxCloud</h2>
        )}
      </Link>
      <SidebarContent>
        <SidebarGroup>
          <SidebarItems />
        </SidebarGroup>
      </SidebarContent>
      {state === "expanded" && (
        <SidebarTrigger className="absolute top-4 right-4 hidden cursor-pointer md:block" />
      )}
      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
