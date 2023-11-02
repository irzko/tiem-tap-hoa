import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <div className="max-w-screen-md mx-auto">
          <div>{children}</div>
        </div>
      </main>
    </>
  );
}
