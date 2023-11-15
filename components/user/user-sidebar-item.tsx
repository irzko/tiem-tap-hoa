"use client";
import Link from "next/link";
import { Accordion, AccordionItem, Link as NextLink } from "@nextui-org/react";
export default function UserSidebarItem() {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };
  return (
    <>
      <ul>
        <li>
          <Accordion itemClasses={itemClasses} showDivider={false}>
            <AccordionItem
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              // as={ListboxItem}
              key="1"
              aria-label="Accordion 1"
              title="Tài khoản của tôi"
            >
              <ul className="space-y-2">
                <li>
                  <NextLink as={Link} color="foreground" href="/user/profile">
                    Hồ sơ
                  </NextLink>
                </li>
                <li>
                  <NextLink as={Link} color="foreground" href="/user/address">
                    Địa chỉ
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    as={Link}
                    color="foreground"
                    href="/user/change-password"
                  >
                    Đổi mật khẩu
                  </NextLink>
                </li>
              </ul>
            </AccordionItem>
          </Accordion>
        </li>
        <li className="px-2 w-full">
          <Link
            href="/user/purchase/unpaid"
            className="w-full gap-3 tap-highlight-transparent outline-none z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 transition-opacity px-2 py-0 hover:bg-default-100 rounded-lg h-14 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z"
                clipRule="evenodd"
              />
            </svg>

            <span>Đơn mua</span>
          </Link>
        </li>
      </ul>
    </>
  );
}
