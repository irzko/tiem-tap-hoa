import { Spinner } from "@nextui-org/react";
import React from "react";

function Loading() {
  return (
    <div className="absolute inset-0 z-50">
      <div className="flex items-center justify-center w-full h-full">
      <Spinner size="lg" />
      </div>
    </div>
  );
}

export default Loading;
