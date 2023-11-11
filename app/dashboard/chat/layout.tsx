import Sidebar from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
};

const getCoversation = async () => {
  return fetch(`${process.env.API_URL}/api/messages/`).then((res) =>
    res.json()
  );
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getCoversation();
  console.log(data);

  return (
    <>
      <main>
        <Sidebar>sibedw</Sidebar>
        <div className="max-w-screen-md mx-auto">
          <div>{children}</div>
        </div>
      </main>
    </>
  );
}
