"use client";
import { pusherClient } from "@/lib/pusher";
import { Button, Chip, Input, User } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { find } from "lodash";

export default function Page() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const conversationId = useRef<string>("");
  const [content, setContent] = useState<string>("");

  if (session?.user.userId) {
    conversationId.current = session?.user.userId;
  } else {
    signIn();
  }

  useEffect(() => {
    fetch(`/api/messages/${conversationId.current}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId.current);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: IMessage) => {
      setMessages((current) => {
        if (find(current, { messageId: message.messageId })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: IMessage) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.messageId === newMessage.messageId) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);
    return () => {
      pusherClient.unsubscribe(conversationId.current);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`/api/messages/`, {
      method: "POST",
      body: JSON.stringify({
        userId: conversationId.current,
        content,
        conversationId: conversationId.current,
      }),
    }).then((res) => {
      if (res.ok) {
        setContent("");
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <div className="flex z-40 h-auto items-center justify-center fixed top-16 inset-x-0 border-y border-divider backdrop-blur-lg backdrop-saturate-150 bg-background/70">
        <div className="z-40 flex px-6 gap-4 w-full relative flex-nowrap items-center justify-between h-16 max-w-4xl">
          <User name="Tiệm tạp hóa" description="Quản trị viên" />
        </div>
      </div>
      <ul className="flex flex-col px-4 gap-1 mt-24">
        {messages.map((message) => (
          <Chip
            as="li"
            size="lg"
            variant={message.user.role === "USER" ? "solid" : "flat"}
            color={message.user.role === "USER" ? "primary" : "default"}
            className={`${message.user.role === "USER" ? "self-end" : ""}`}
            key={message.messageId}
          >
            {message.content}
          </Chip>
        ))}
      </ul>
      <div className="mt-24" ref={bottomRef} />
      <form
        onSubmit={handleSubmit}
        className="flex z-40 h-auto items-center justify-center fixed bottom-0 left-64 right-0 border-t border-divider backdrop-blur-lg backdrop-saturate-150 bg-background/70"
      >
        <div className="z-40 flex px-6 gap-4 w-full relative flex-nowrap items-center justify-between h-16 max-w-4xl">
          <Input
            // variant="bordered"
            name="content"
            fullWidth
            placeholder="Nhập tin nhắn..."
            onChange={handleChange}
            value={content}
          />
          <Button isIconOnly type="submit">
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
        </div>
      </form>
    </div>
  );
}
