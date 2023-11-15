"use client";
import Link from "next/link";
import { Accordion, AccordionItem, Link as NextLink } from "@nextui-org/react";
export default function DashboardSidebarItem() {
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
        <li className="px-2 w-full">
          <Link
            href="/dashboard/order/unpaid"
            className="w-full gap-3 tap-highlight-transparent outline-none z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 transition-opacity px-2 py-0 hover:bg-default-100 rounded-lg h-14 flex items-center"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 21"
            >
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
            </svg>
            <span>Quản lý đơn hàng</span>
          </Link>
        </li>
        <li>
          <Accordion itemClasses={itemClasses} showDivider={false}>
            <AccordionItem
              startContent={
                <svg
                  className="flex-shrink-0 w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
              }
              // as={ListboxItem}
              key="1"
              aria-label="Accordion 1"
              title="Quản lý sản phẩm"
            >
              <ul className="space-y-2">
                <li>
                  <NextLink
                    as={Link}
                    color="foreground"
                    href="/dashboard/products"
                  >
                    Tất cả sản phẩm
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    as={Link}
                    color="foreground"
                    href="/dashboard/products/create"
                  >
                    Thêm sản phẩm
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    as={Link}
                    color="foreground"
                    href="/dashboard/category"
                  >
                    Quản lý danh mục sản phẩm
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    as={Link}
                    color="foreground"
                    href="/dashboard/products/coupon"
                  >
                    Mã giảm giá
                  </NextLink>
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              startContent={
                <svg
                  className="flex-shrink-0 w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
              }
              key="2"
              aria-label="Accordion 1"
              title="Quản lý nhâp hàng"
            >
              <ul className="space-y-2">
                <li>
                  <NextLink
                    as={Link}
                    color="foreground"
                    href="/dashboard/import/suppliers"
                  >
                    Nhà cung cấp
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    as={Link}
                    color="foreground"
                    href="/dashboard/import/product-imports"
                  >
                    Nhập hàng
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    as={Link}
                    color="foreground"
                    href="/dashboard/category"
                  >
                    Kiểm tra hàng hóa
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    as={Link}
                    color="foreground"
                    href="/dashboard/category"
                  >
                    Lịch sử nhập hàng
                  </NextLink>
                </li>
              </ul>
            </AccordionItem>
          </Accordion>
        </li>
      </ul>
    </>
  );
}
