import { authService } from "@/services/auth.service";
import DashboardNavbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authService.getSession();

  return (
    <div className="flex h-screen flex-col bg-white transition-colors duration-200 md:flex-row dark:bg-zinc-950">
      <Sidebar role={session.user.role} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar user={session.user} />
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F4F4F5] p-4 transition-colors duration-200 md:p-10 dark:bg-zinc-900/50">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
