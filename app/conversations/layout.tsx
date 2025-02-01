import React from "react";

import { Presence } from "../_context/Presence";
import { ConversationSidebar } from "./_components/conversations_sidebar/ConversationSidebar";

export default async function conversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Presence>
      <div className="w-full h-full">
        <div className="h-full">
          <ConversationSidebar />

          {children}
        </div>
      </div>
    </Presence>
  );
}
