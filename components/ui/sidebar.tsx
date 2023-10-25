"use client";
import { useSidebarContext } from "@/context/SidebarContext";

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  const { isOpenOnSmallScreens } = useSidebarContext();
  return (
    <>
      <aside
        // fixed mt-14 z-20 top-0 left-0 w-full h-[calc(100vh-4rem-1px)] backdrop-blur-lg backdrop-saturate-150 bg-background/70 sm:w-64 bottom-0 transition-transform border-r border-divider sm:translate-x-0
        id="logo-sidebar"
        className={`z-30 pt-2 fixed flex h-[calc(100vh-4rem-1px)]  max-w-full top-[var(--navbar-height)] inset-x-0 bottom-0 w-screen flex-col transition-transform gap-2 overflow-y-auto backdrop-blur-xl backdrop-saturate-150 bg-background/70 sm:translate-x-0 sm:w-64 ${
          isOpenOnSmallScreens ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {children}
      </aside>
    </>
  );
}
