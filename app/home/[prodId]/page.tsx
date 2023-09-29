import React from "react";

export default function Page({ params }: { params: { prodId: string } }) {
  const { prodId } = params;
  return <div>{prodId}</div>;
}
