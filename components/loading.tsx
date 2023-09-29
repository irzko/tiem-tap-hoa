import Spinner from "@/components/ui/spinner";
import React from "react";

function Loading() {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen">
      <div className="flex items-center justify-center w-full h-full">
        <Spinner height={48} width={48} fill="#2563eb" />
      </div>
    </div>
  );
}

export default Loading;
