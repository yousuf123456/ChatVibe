import React from "react";

import { notFound } from "next/navigation";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConversationWindow } from "../_components/ConversationWindow";

export const Conversation = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const { getToken } = auth();

  const preloadedData = await preloadQuery(
    api.conversation.get,
    { conversationId: conversationId },
    { token: (await getToken({ template: "convex" })) || undefined }
  );

  const conversation =
    preloadedData._valueJSON as unknown as Doc<"conversations"> | null;

  if (!conversation) notFound();

  const convUsers = (
    await clerkClient.users.getUserList({
      userId: conversation.userIds,
    })
  ).data.map((user) => ({
    id: user.id,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    firstName: user.firstName,
    emailAddress: user.primaryEmailAddress?.emailAddress,
  }));

  return (
    <ConversationWindow
      convUsers={convUsers}
      preloadedConversation={preloadedData}
    />
  );
};
