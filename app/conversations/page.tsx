import clsx from "clsx";
import React from "react";

import { EmptyState } from "../(site)/components/EmptyState";

export default function Users() {
  return (
    <div className={clsx("h-full w-full hidden lg:pl-80 lg:block")}>
      <EmptyState />
    </div>
  );
}
