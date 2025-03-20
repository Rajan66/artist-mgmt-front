import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/features/dashboard/components/";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <SidebarProvider>
        <Sidebar />
        <main className="p-6">{children}</main>
      </SidebarProvider>
    </section>
  );
}
