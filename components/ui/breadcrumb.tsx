import { Card, CardBody } from "@nextui-org/react";
import React from "react";

export default function Breadcrumb({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card aria-label="Breadcrumb">
      <CardBody>
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {children}
        </ol>
      </CardBody>
    </Card>
  );
}
