import React, { Suspense } from "react";

import PageLoading from "./_components/PageLoading";
import { Conversation } from "./_components/Conversation";

export default async function ConversationIdPage({
  params,
}: {
  params: { conversationId: string };
}) {
  return (
    <Suspense key={params.conversationId} fallback={<PageLoading />}>
      <Conversation conversationId={params.conversationId} />
    </Suspense>
  );
}
