import CartButton from "@/components/cart-button";
import Logo from "@/components/ui/logo";
import DropdownUser from "@/components/dropdown-user";
import SearchForm from "@/components/search-form";
import Link from "next/link";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import ToggleTheme from "@/components/ui/toggle-theme";
import SidebarToggle from "@/components/ui/sidebar-toggle";
import Sidebar from "@/components/ui/sidebar";
import UserSidebarItem from "@/components/user/user-sidebar-item";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar isBordered>
        <NavbarBrand className="hidden md:block">
          <Logo />
        </NavbarBrand>
        <div className="flex items-center justify-start">
          <NavbarItem>
            <SidebarToggle />
          </NavbarItem>
        </div>
        <NavbarContent as="div" className="items-center" justify="center">
          <SearchForm />
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href={`chat/`}>
              <Button isIconOnly variant="flat">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 5h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2v3l-4-3H8m4-13H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2v3l4-3h4a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                </svg>
              </Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <ToggleTheme />
          </NavbarItem>
          <NavbarItem>
            <CartButton />
          </NavbarItem>
          <NavbarItem>
            <DropdownUser />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main>
        <Sidebar>
          <UserSidebarItem />
        </Sidebar>
        <div className="p-4 sm:ml-64">
          <div>{children}</div>
        </div>
      </main>
    </>
  );
}
