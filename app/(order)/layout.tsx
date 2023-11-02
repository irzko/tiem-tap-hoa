import CartButton from "@/components/cart-button";
import DropdownUser from "@/components/dropdown-user";
import Logo from "@/components/ui/logo";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar isBordered>
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
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
        <div className="p-4">{children}</div>
      </main>
    </>
  );
}
