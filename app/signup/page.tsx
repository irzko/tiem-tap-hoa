import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/signup-form";

export default function SignUp() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="z-10 w-full sm:max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-b-gray-200 dark:border-b-gray-600 px-4 py-6 pt-8 text-center sm:px-16">
          <Link href="/">
            <Image
              src="/logo.png"
              priority
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </Link>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Đăng ký
          </h3>
          {/* <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p> */}
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
