import Navbar from "@/components/ui/navbar";
import CartButton from "@/components/cart-button";
import Logo from "@/components/ui/logo";
import MenuButton from "@/components/menu-button";
import DropdownUser from "@/components/dropdown-user";
import SidebarItem from "@/components/ui/sidebar-item";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar>
        <div className="flex items-center justify-start">
          <MenuButton>
            <SidebarItem />
          </MenuButton>
          <Logo />
        </div>
        <div className="w-full flex justify-center mx-2">
          <form action="#" method="GET" className="hidden lg:block">
            <label htmlFor="topbar-search" className="sr-only">
              Search
            </label>
            <div className="relative lg:w-96">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />{" "}
                </svg>
              </div>
              <input
                type="text"
                id="topbar-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 px-2.5 h-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Tìm kiếm"
              />
            </div>
          </form>
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
