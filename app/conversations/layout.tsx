import React from "react";

import { Presence } from "../_context/Presence";
import { ConversationSidebar } from "./_components/conversations_sidebar/ConversationSidebar";

export default async function conversationsLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { conversationId: string };
}) {
  return (
    <Presence>
      <div className="w-full h-full">
        <div className="h-full">
          <ConversationSidebar conversationId={params.conversationId} />
          {children}
        </div>
      </div>
    </Presence>
  );
}
