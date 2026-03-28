import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="@font-mono min-h-screen bg-white text-black selection:bg-[#A3E635]">
      {/* --- NAVBAR --- */}
      <Navbar />

      <main>{children}</main>

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}
