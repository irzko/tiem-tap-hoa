"use client";
import { useSession, signOut } from "next-auth/react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import ThemeSwitcher from "./ui/theme-switcher";

export default function DropdownUser() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={session.user.fullName}
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem showDivider key="profile" className="h-14 gap-2">
              <p className="font-semibold">Đăng nhập với</p>
              <p className="font-semibold">{session.user.email}</p>
            </DropdownItem>
            <DropdownItem variant="light">
              <ThemeSwitcher />
            </DropdownItem>
            <DropdownItem
              as={Link}
              className={session.user.role === "ADMIN" ? "" : "hidden"}
              key="team_settings"
              href="/dashboard/order/unpaid"
            >
              Dashboard
            </DropdownItem>
            <DropdownItem as={Link} key="profile" href="/user/profile">
              Tài khoản
            </DropdownItem>
            <DropdownItem as={Link} key="profile" href="/user/purchase/unpaid">
              Đơn hàng
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
              Đăng xuất
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button as={Link} color="primary" variant="flat" href="/login">
          Đăng nhập
        </Button>
      )}
    </>
  );
}
