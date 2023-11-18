import Sidebar from "@/components/ui/sidebar";
import { User } from "@nextui-org/react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chat",
};

const getCoversation = async (): Promise<IConversation[]> => {
  return fetch(`${process.env.API_URL}/api/chat/conversation`, {
    cache: "no-store",
  }).then((res) => res.json());
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getCoversation();

  const conversationList = data?.reduce(
    (acc: { conversationId: string; fullName: string }[], conversation) => {
      const participant = conversation.Participant.filter(
        (participant) => participant && participant.user.role === "USER"
      )[0];
      if (participant) {
        acc.push({
          conversationId: conversation.conversationId,
          fullName: participant.user.fullName,
        });
      }
      return acc;
    },
    []
  );

  return (
    <>
      <main>
        <Sidebar>
          <ul>
            {conversationList?.map((conversation) => (
              <li key={conversation.conversationId} className="px-2 w-full">
                <User
                  as={Link}
                  href={`/dashboard/chat/${conversation.conversationId}`}
                  name={conversation.fullName}
                  className="w-full gap-3 tap-highlight-transparent outline-none z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 transition-opacity px-2 py-0 hover:bg-default-100 rounded-lg h-14 flex items-center justify-start"
                ></User>
              </li>
            ))}
          </ul>
        </Sidebar>
        <div className="max-w-screen-md mx-auto">
          <div>{children}</div>
        </div>
      </main>
    </>
  );
}
