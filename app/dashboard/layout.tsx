import DropdownUser from "@/components/dropdown-user";
import SearchForm from "@/components/search-form";
import Logo from "@/components/ui/logo";
import SidebarToggle from "@/components/ui/sidebar-toggle";
import getSession from "@/lib/getSession";
import {
  Button,
  Chip,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (session?.user.role !== "ADMIN") {
    return <div>Không có quyền truy cập</div>;
  }
  return (
    <div>
      <Navbar isBordered isBlurred={false}>
        <NavbarItem>
          <SidebarToggle />
        </NavbarItem>
        <NavbarBrand className="hidden md:block">
          <div className="flex items-center">
            <div className="mr-2">
              <Logo />
            </div>
            <Chip color="danger" variant="flat">
              Quản trị viên
            </Chip>
          </div>
        </NavbarBrand>
        <NavbarContent as="div" className="items-center" justify="center">
          <SearchForm />
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href={`/dashboard/chat/`}>
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
            <DropdownUser />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
}
