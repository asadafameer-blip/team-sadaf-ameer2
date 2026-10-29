import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardLayout from "@/components/DashboardLayout";

// Load Inter Google Font
const inter = Inter({ subsets: ["latin"] });

// Application Metadata for LMS
export const metadata: Metadata = {
  title: "Pacer LMS Quiz Builder",
  description: "Professional LMS Quiz Builder Module for Instructors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Global Body with Inter font and suppressed extension hydration warnings */}
      <body suppressHydrationWarning className={`${inter.className} bg-slate-50 overflow-hidden`}>
        {/* Main Dashboard Wrapper that holds Sidebar and Navbar */}
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}