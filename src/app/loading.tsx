"use client";

import { Spinner } from "@/components/ui/shadcn-io/spinner";

const Example = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Spinner className="text-red-500 w-12 h-12" />
      <p className="text-red-500 text-lg font-medium">Loading...</p>
    </div>
  );
};

export default Example;
