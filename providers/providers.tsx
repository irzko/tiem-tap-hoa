"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/context/SidebarContext";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type Props = {
  children?: React.ReactNode;
  session: Session | null;
};

export const Provider = ({ children, session }: Props) => {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <SidebarProvider>
        <SessionProvider refetchOnWindowFocus={false} session={session}>
          {children}
        </SessionProvider>
      </SidebarProvider>
    </NextUIProvider>
  );
};
