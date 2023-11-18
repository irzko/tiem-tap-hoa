import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex ml-2">
      <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
        Tiệm Bách Hoá
      </span>
    </Link>
  );
}
