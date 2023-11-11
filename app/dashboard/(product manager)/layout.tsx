import DashboardSidebarItem from "@/components/dashboard/dashboard-sidebar-item";
import Sidebar from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main>
        <Sidebar>
          <DashboardSidebarItem />
        </Sidebar>
        <div className=" sm:ml-64">
          <div className="p-4 max-w-screen-xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
