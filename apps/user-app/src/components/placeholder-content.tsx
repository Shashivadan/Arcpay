import React from "react";

import { Card, CardContent } from "./ui/card";

export default function PlaceholderContent({ children }) {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="flex flex-col relative">{children}</div>
        </div>
      </CardContent>
    </Card>
  );
}
