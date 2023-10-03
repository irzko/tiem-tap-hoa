import DropdownUser from "@/components/dropdown-user";
import Logo from "@/components/ui/logo";
import Navbar from "@/components/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar>
        <div className="flex items-center justify-start">
          <Logo />
        </div>
        <div className="flex items-center">
          <DropdownUser />
        </div>
      </Navbar>
      <main>
        <div className="p-4 mt-14">{children}</div>
      </main>
    </>
  );
}
