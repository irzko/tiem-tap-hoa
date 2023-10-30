import Link from "next/link";

export default async function UserSidebarItem() {
  return (
    <>
      <div className="h-full p-3 overflow-y-auto">
        <ul className="mt-2 space-y-4">
          <li className="text-gray-500 dark:text-gray-400 ">
            <Link href={`/user/profile`}>Hồ sơ</Link>
          </li>
          <li className="text-gray-500 dark:text-gray-400">
            <Link href={`/user/address`}>Địa chỉ</Link>
          </li>
          <li className="text-gray-500 dark:text-gray-400">
            <Link href={`/user/change-password`}>Đổi mật khẩu</Link>
          </li>
        </ul>

        <Link
          className="flex items-center justify-between w-full font-medium text-left focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          href={`/user/purchase/unpaid`}
        >
          Đơn mua
        </Link>
      </div>
    </>
  );
}
