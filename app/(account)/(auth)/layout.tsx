"use client";
import { Card, CardBody } from "@nextui-org/react";

function SignUp({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="flex flex-col items-center p-4 justify-center mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center my-4 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Tiệm tạp hoá
        </a>
        <div className="flex flex-col w-full md:min-h-[500px]">
          <Card className="max-w-md w-full mx-auto">
            <CardBody>{children}</CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
