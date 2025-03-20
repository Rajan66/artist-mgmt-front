import React from "react";

import ThemeToggle from "@/components/theme-toggle";
import { SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import { UserAvatar } from "@/features/dashboard/components";

const DashboardTopbar = () => {
  return (
    <header className="bg-background sticky top-0 w-full">
      <nav className="flex h-14 items-center justify-between px-6 py-2">
        <SidebarTrigger className="block md:hidden" />
        <div className="hidden md:block"></div>
        <div className="flex items-center justify-between gap-4">
          <ThemeToggle />
          <UserAvatar />
        </div>
      </nav>
      <SidebarSeparator className="mx-0 mt-1" />
    </header>
  );
};

export default DashboardTopbar;
