import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-mono text-black transition-colors duration-300 selection:bg-[#A3E635] selection:text-black dark:bg-zinc-950 dark:text-white">
      {/* --- NAVBAR --- */}
      <Navbar />

      <main className="relative min-h-[calc(100vh-200px)]">{children}</main>

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}
