"use client";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/context/SidebarContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Navbar />
      <Sidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
}
