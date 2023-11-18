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
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>

            <span>Quản lý đơn hàng</span>
          </Link>
        </li>
        <li>
          <Accordion itemClasses={itemClasses} showDivider={false}>
            <AccordionItem
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
                    clipRule="evenodd"
                  />
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
                    href="/dashboard/coupon"
                  >
                    Mã giảm giá
                  </NextLink>
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M10 2a.75.75 0 01.75.75v5.59l1.95-2.1a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0L6.2 7.26a.75.75 0 111.1-1.02l1.95 2.1V2.75A.75.75 0 0110 2z" />
                  <path d="M5.273 4.5a1.25 1.25 0 00-1.205.918l-1.523 5.52c-.006.02-.01.041-.015.062H6a1 1 0 01.894.553l.448.894a1 1 0 00.894.553h3.438a1 1 0 00.86-.49l.606-1.02A1 1 0 0114 11h3.47a1.318 1.318 0 00-.015-.062l-1.523-5.52a1.25 1.25 0 00-1.205-.918h-.977a.75.75 0 010-1.5h.977a2.75 2.75 0 012.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 01-2 2H3a2 2 0 01-2-2v-3.73c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 015.273 3h.977a.75.75 0 010 1.5h-.977z" />
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
                    href="/dashboard/suppliers"
                  >
                    Nhà cung cấp
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    as={Link}
                    color="foreground"
                    href="/dashboard/product-imports"
                  >
                    Nhập hàng
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    as={Link}
                    color="foreground"
                    href="/dashboard/warehouse"
                  >
                    Kho hàng
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
