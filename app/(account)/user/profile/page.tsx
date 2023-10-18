"use client";

import InputField from "@/components/ui/input-field";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<IUser>({} as IUser);
  useEffect(() => {
    fetch(`/api/user/profile/${session?.user.userId}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);
  return (
    <div className="max-w-screen-lg mx-auto">
      <form className="space-y-4 md:space-y-6 flex flex-col">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Hồ Sơ Của Tôi
        </h1>
        <div className="grid md:grid-cols-6 md:gap-6">
          <label
            htmlFor="product-name"
            className="mb-2 col-span-1 text-sm  flex md:justify-end font-medium text-gray-900 dark:text-white"
          >
            Tên
          </label>
          <div className="col-span-5">
            <InputField value={profile.fullName} />
          </div>
        </div>
        <div className="grid md:grid-cols-6 md:gap-6">
          <label
            htmlFor="product-name"
            className="mb-2 col-span-1 text-sm  flex md:justify-end font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <div className="col-span-5">
            <InputField value={profile.email} />
          </div>
        </div>
      </form>
    </div>
  );
}
