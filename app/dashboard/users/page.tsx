import prisma from "@/libs/prisma";
export default async function Users() {
  const users = await prisma.user.findMany();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Tên
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Số điện thoại
            </th>
            {/* <th className="font-medium tracking-wide text-left pl-20">
                Địa chỉ
              </th> */}
            <th scope="col" className="px-6 py-3">
              Ngày tạo
            </th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr
              key={user.userId}
              className={`border-b dark:border-gray-700 ${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              <td className="px-6 py-4">{user.userId}</td>
              <td className="px-6 py-4">{user.fullName}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phoneNumber}</td>
              {/* <td className="pl-20">{user.address}</td> */}
              <td className="px-6 py-4">{user.created_at.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
