import { authService } from "@/services/auth.service";
import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authService.getSession();

  return (
    <div className="flex h-screen bg-white">
      <Sidebar role={session.user.role} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar user={session.user} />
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F4F4F5] p-6 md:p-10">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
