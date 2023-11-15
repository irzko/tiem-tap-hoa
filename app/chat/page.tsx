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
        className="flex z-40 h-auto items-center justify-center fixed bottom-0 inset-x-0 border-t border-divider backdrop-blur-lg backdrop-saturate-150 bg-background/70"
      >
        <div className="z-40 flex px-6 gap-4 w-full relative flex-nowrap items-center justify-between h-16 max-w-4xl">
          <Input
            // variant="bordered"
            name="content"
            labelPlacement="outside"
            fullWidth
            placeholder="Nhập tin nhắn..."
            onChange={handleChange}
            value={content}
          />
          <Button isIconOnly type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  );
}