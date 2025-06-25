import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function LayoutPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-1 max-w-screen m-4">
      <SidebarProvider className="min-h-screen">
        <AppSidebar />
        <div className="flex flex-col w-full">
          <SidebarTrigger />
          <main className="my-[20px]">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
