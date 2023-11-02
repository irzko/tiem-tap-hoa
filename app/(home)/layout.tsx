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
import Sidebar from "@/components/ui/sidebar";
import HomeSidebarItem from "@/components/home/home-sidebar-item";
import SidebarToggle from "@/components/ui/sidebar-toggle";

async function getCategories() {
  const res = await fetch(`${process.env.API_URL}/api/catgs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories: ICategory[] = await getCategories();

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
            <Button as={Link} href={`/chat/`} isIconOnly variant="flat">
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
          <HomeSidebarItem categories={categories} />
        </Sidebar>
        <div className="p-2 sm:ml-64">{children}</div>
      </main>
    </>
  );
}
