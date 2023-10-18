import Navbar from "@/components/ui/navbar";
import CartButton from "@/components/cart-button";
import Logo from "@/components/ui/logo";
import MenuButton from "@/components/menu-button";
import DropdownUser from "@/components/dropdown-user";
import ToggleTheme from "@/components/ui/toggle-theme";
import SearchForm from "@/components/search-form";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Avatar from "@/components/ui/avatar";

const getData = async (userId: string): Promise<IConversation[]> => {
  const res = await fetch(
    `${process.env.API_URL}/api/messages?userId=${userId}`
  );
  const data = await res.json();
  return data;
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const conversations = await getData(session.user.userId);
  return (
    <>
      <Navbar>
        <div className="flex items-center justify-start">
          <MenuButton>
            <div className="h-full p-3 overflow-y-auto">
              <ul className="space-y-2 font-medium">
                {conversations.map((conv) => (
                  <li key={conv.conversationId}>
                    <Link
                      href={`${process.env.API_URL}/message/${conv.conversationId}`}
                      className="flex p-2 items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <Avatar />
                      <div className="flex flex-col">
                        <p className="flex-1 whitespace-nowrap">
                          {conv.messages[0].sender.fullName}
                        </p>
                        <p className="font-normal text-sm">
                          {conv.messages[0].content}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
