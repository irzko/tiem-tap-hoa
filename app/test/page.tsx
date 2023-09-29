"use client";

import React from "react";
import toast, { Toaster } from "react-hot-toast";
const notify = () => toast("Here is your toast.");
export default function Page() {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster
        toastOptions={{
          className: "flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800",
   
        }}
      />
    </div>
  );
}
