"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/context/SidebarContext";
import { NextUIProvider } from "@nextui-org/react";

type Props = {
  children?: React.ReactNode;
  session: Session | null;
};

export const Provider = ({ children, session }: Props) => {
  return (
    <NextUIProvider>
      <SidebarProvider>
        <SessionProvider refetchOnWindowFocus={false} session={session}>
          {children}
        </SessionProvider>
      </SidebarProvider>
    </NextUIProvider>
  );
};
