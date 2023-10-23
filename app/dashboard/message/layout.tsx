import Navbar from "@/components/ui/navbar";
import CartButton from "@/components/cart-button";
import Logo from "@/components/ui/logo";
import DropdownUser from "@/components/dropdown-user";
import ToggleTheme from "@/components/ui/toggle-theme";
import SearchForm from "@/components/search-form";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar>
        <div className="flex items-center justify-start">
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
        <div className="max-w-screen-md mx-auto">
          <div className="mt-14">{children}</div>
        </div>
      </main>
    </>
  );
}
