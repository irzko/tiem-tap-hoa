"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import Link from "next/link";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="flex flex-col items-center p-4 justify-center mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center my-4 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Tiệm tạp hoá
        </Link>
        <div className="flex flex-col gap-4 w-full md:min-h-[500px]">
          <Card className="max-w-md w-full mx-auto">
            <CardHeader>Thông báo</CardHeader>
            <Divider />
            <CardBody>{children}</CardBody>
          </Card>
          <div className="mx-auto">
            <Button
              variant="light"
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              as={Link}
              href="/"
            >
              Quay về trang chủ
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Layout;
