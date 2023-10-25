"use client";
import Link from "next/link";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
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
      <li>
        <Link
          href="/dashboard/order"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          <svg
            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 21"
          >
            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
          </svg>
          <span className="ml-3">Quản lý đơn hàng</span>
        </Link>
      </li>
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
          as="ul"
          // as={ListboxItem}
          key="1"
          aria-label="Accordion 1"
          title="Quản lý sản phẩm"
        >
          <li>
            <Button
              as={Link}
              variant="light"
              fullWidth
              className="justify-start"
              href="/dashboard/products"
            >
              Tất Cả Sản Phẩm
            </Button>
          </li>
          <li>
            <Button
              as={Link}
              variant="light"
              fullWidth
              className="justify-start"
              href="/dashboard/products/add"
            >
              Thêm Sản Phẩm
            </Button>
          </li>
          <li>
            <Button
              as={Link}
              variant="light"
              fullWidth
              className="justify-start"
              href="/dashboard/category"
            >
              Quản Lý Danh Mục Sản Phẩm
            </Button>
          </li>
        </AccordionItem>
      </Accordion>
      {/* <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem> */}
      {/* <ul className="space-y-2 font-medium">
        <li>
          <Link
            href="/dashboard/users"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Người dùng</span>
          </Link>
        </li>
  
        <li>
          <Accordion
            heading="Quản lý sản phẩm"
            icon={
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
            }
          >
     
          </Accordion>
        </li>
        <li>
          <Accordion
            heading="Quản lý nhập hàng"
            icon={
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
            }
          >
            <ul className="mt-2 space-y-4">
              <li className="text-gray-500 dark:text-gray-400">
                <Link href="/dashboard/import/suppliers">Nhà cung cấp</Link>
              </li>
              <li className="text-gray-500 dark:text-gray-400">
                <Link href="/dashboard/import/product-imports">Nhập hàng</Link>
              </li>
              <li className="text-gray-500 dark:text-gray-400">
                <Link href="/dashboard/category">Kiểm tra hàng hóa</Link>
              </li>
              <li className="text-gray-500 dark:text-gray-400">
                <Link href="/dashboard/category">Lịch sử nhập hàng</Link>
              </li>
            </ul>
          </Accordion>
        </li>
      </ul> */}
    </>
  );
}
