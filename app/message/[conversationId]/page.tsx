"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;
  const [conversations, setConversations] = useState<IConversation>();
  const { data: session } = useSession();

  useEffect(() => {
    fetch(`/api/conversations/${conversationId}`)
      .then((res) => res.json())
      .then((data) => setConversations(data));
  }, [conversationId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: e.currentTarget.content.value,
        senderId: session?.user.userId,
        conversationId,
      }),
    });
  };
  return (
    <div className="block">
      {conversations && (
        <ul className="space-y-2 flex flex-col">
          {conversations.messages.map((msg) => (
            <li
              key={msg.messageId}
            >
              {msg.senderId === session?.user.userId ? 
              <p>{msg.content}</p> : <></>
              
            }
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" name="content" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
