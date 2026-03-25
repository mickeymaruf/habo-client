import { authService } from "@/services/auth.service";
import Navbar from "./challenges/_components/navbar";
import Sidebar from "./challenges/_components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await authService.getSession();

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar user={user} />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
