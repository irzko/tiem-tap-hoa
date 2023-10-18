import Navbar from "@/components/ui/navbar";
import CartButton from "@/components/cart-button";
import Logo from "@/components/ui/logo";
import MenuButton from "@/components/menu-button";
import DropdownUser from "@/components/dropdown-user";
import HomeSidebarItem from "@/components/ui/home-sidebar-item";
import ToggleTheme from "@/components/ui/toggle-theme";
import SearchForm from "@/components/search-form";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar>
        <div className="flex items-center justify-start">
          <MenuButton>
            <HomeSidebarItem />
          </MenuButton>
          <Logo />
        </div>
        <div className="w-full flex justify-center mx-2">
          <SearchForm />
        </div>
        <div className="flex items-center">
          <span>
            <ToggleTheme />
          </span>
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
