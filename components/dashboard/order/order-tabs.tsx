"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { orderStatus } from "./order-status";
import { Tab, Tabs } from "@nextui-org/react";

export default function OrderTabs({ baseURL }: { baseURL: string }) {
  const pathname = usePathname();

  const tabType = pathname.split("/")[3];

  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs selectedKey={tabType} aria-label="Tabs" items={orderStatus} fullWidth>
          {(item) => (
            <Tab
              key={item.type}
              as={Link}
              href={`${baseURL}/${item.type}`}
              title={item.name}
            ></Tab>
          )}
        </Tabs>
      </div>
    </>
  );
}
