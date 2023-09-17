"use client";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/context/SidebarContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Navbar />
      <Sidebar />
      <main>
        <div className="p-4 sm:ml-64">
          <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
