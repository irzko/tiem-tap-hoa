"use client";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;
  const { data: session } = useSession();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    fetch(`/api/messages/${conversationId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [conversationId]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`/api/messages/`, {
      method: "POST",
      body: JSON.stringify({
        userId: session?.user.userId,
        content: e.currentTarget.content.value,
        conversationId,
      }),
    });
  };

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li
            className={`${message.user.role === "ADMIN" ? "text-right" : ""}`}
            key={message.messageId}
          >
            {message.content}
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleSubmit}
        className="flex absolute bottom-0 w-full max-w-3xl my-2"
      >
        <div className="mr-2 w-full">
          <InputField name="content" />
        </div>
        <Button type="submit">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
            />
          </svg>
        </Button>
      </form>
    </>
  );
}
