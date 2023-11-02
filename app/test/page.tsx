"use client";
import { Button, Input } from "@nextui-org/react";
import { FormEvent, useState } from "react";

export default function Page() {
  const [text, setText] = useState("");

  return (
    <>
      <form>
        <Input label="Nhập mô tả" name="text" id="text" />
        <Button type="submit">Gửi</Button>
      </form>
    </>
  );
}
