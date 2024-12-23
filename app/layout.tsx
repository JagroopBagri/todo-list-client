import type { Metadata } from "next";
import { Geist} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo-List App",
  description: "Todo-List App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-[#111111] text-white min-h-screen`}>
        <main className="container max-w-3xl mx-auto py-8 px-4">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}