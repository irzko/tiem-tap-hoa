"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";

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
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Đăng nhập với</p>
              <p className="font-semibold">{session.user.email}</p>
            </DropdownItem>
            <DropdownItem as={Link} key="team_settings" href="/dashboard">
              Dashboard
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
              Log Out
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
