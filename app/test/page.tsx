"use client";

import React from "react";
import { toast } from "react-toastify";
const notify = () => {
  toast.success("Success Notification !");
};
export default function Page() {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
    </div>
  );
}
