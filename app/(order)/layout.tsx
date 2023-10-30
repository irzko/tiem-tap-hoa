import CartButton from "@/components/cart-button";
import DropdownUser from "@/components/dropdown-user";
import Logo from "@/components/ui/logo";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar isBordered>
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitcher />
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
