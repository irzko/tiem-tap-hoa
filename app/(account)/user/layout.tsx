import CartButton from "@/components/cart-button";
import Logo from "@/components/ui/logo";
import DropdownUser from "@/components/dropdown-user";
import UserSidebarItem from "@/components/user/user-sidebar-item";
import { Navbar } from "@nextui-org/react";
import Sidebar from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar>
        <div className="flex items-center justify-start">
          <Sidebar>
            <UserSidebarItem />
          </Sidebar>
          <Logo />
        </div>
        <div className="flex items-center">
          <span className="mx-2">
            <CartButton />
          </span>
          <DropdownUser />
        </div>
      </Navbar>
      <main>
        <div className="p-4 sm:ml-64">
          <div className="mt-14">{children}</div>
        </div>
      </main>
    </>
  );
}
