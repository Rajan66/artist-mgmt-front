import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar, Topbar } from "@/features/dashboard/components/";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <SidebarProvider>
        <Sidebar />
        <main className="w-full">
          <Topbar />
          <div className="p-6">{children}</div>
        </main>
      </SidebarProvider>
    </section>
  );
}
