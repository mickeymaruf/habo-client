import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HABO - TRACK_YOUR_MISSIONS",
  description:
    "Habit tracking and community challenges. Built for the disciplined.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${figtree.className} antialiased`}
      >
        {children}

        <Toaster
          theme="light"
          richColors
          // Positioning it at the bottom-center is usually better for mobile reach
          position="bottom-center"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: cn(
                // Mobile: 90% width | Tablet+: 380px max-width
                "group flex items-center gap-3 w-[90vw] sm:w-[380px] p-4 md:p-6",
                "bg-white border-[3px] md:border-[4px] border-black rounded-none",
                // Mobile: 5px shadow | Tablet+: 8px shadow
                "shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
                "transition-all duration-200",
              ),
              title:
                "text-sm md:text-lg font-black uppercase italic tracking-tighter text-black leading-none",
              description:
                "text-[10px] md:text-xs font-bold uppercase tracking-tight text-black/60",
              icon: "scale-100 md:scale-125 mr-1",
              // Color Overrides
              success: "bg-[#A3E635]",
              error: "bg-[#EF4444] text-white",
              info: "bg-[#C3B5FD]",
              warning: "bg-yellow-400",
            },
          }}
        />
      </body>
    </html>
  );
}
