import Navbar from "@/components/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>
        <div className="p-4 mt-14 sm:ml-64">{children}</div>
      </main>
    </>
  );
}
