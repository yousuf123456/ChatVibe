"use client";
import React, { useEffect } from "react";

import { useUser } from "@clerk/nextjs";

import {
  Preloaded,
  useMutation,
  usePaginatedQuery,
  usePreloadedQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";

import usePresence from "@/app/_hooks/usePresence";
import { useInView } from "react-intersection-observer";
import useConversation from "@/app/_hooks/useConversation";

import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";
import { MessageBox } from "../_components/MessageBox";
import { EmptyState } from "@/app/(site)/components/EmptyState";

import Loading from "./PageLoading";
import { ConversationUser } from "@/app/_types";

export const ConversationWindow = ({
  convUsers,
  preloadedConversation,
}: {
  convUsers: ConversationUser[];
  preloadedConversation: Preloaded<typeof api.conversation.get>;
}) => {
  const { user: currentUser } = useUser();

  const { conversationId } = useConversation();

  // Get the conversation metadata such as name, usersIds etc
  const conversation = usePreloadedQuery(preloadedConversation);

  // Get the messages of the conversation
  const {
    results: messages,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.conversation.getMessages,
    { conversationId },
    { initialNumItems: 25 }
  );

  const seenMessage = useMutation(api.conversation.seenMessage);

  useEffect(() => {
    if (!currentUser || status === "LoadingFirstPage" || !(messages.length > 0))
      return;

    if (messages[0].seenUserIds.includes(currentUser.id)) return;

    seenMessage({
      messageId: messages[0]._id,
      prevSeenUserIds: messages[0].seenUserIds,
    });
  }, [messages]);

  const { ref, inView } = useInView({ threshold: 1 });

  // Load more messages when user scrolls to the top
  useEffect(() => {
    if (inView) loadMore(25);
  }, [inView, ref]);

  const [_, othersPresence, updateMyPresence] = usePresence<{
    typing: boolean;
  }>(conversationId, currentUser?.id || "unknown", {
    typing: false,
  });

  if (status === "LoadingFirstPage" || conversation === undefined) {
    return <Loading />;
  }

  if (!currentUser) return <p>Unauthorized</p>;

  if (conversation === null) {
    return (
      <div className="h-full w-full lg:pl-80">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="h-full w-full lg:pl-80 relative ">
      <div className="flex flex-col h-full">
        <Header
          convUsers={convUsers}
          conversation={conversation}
          othersPresence={othersPresence}
        />

        {/* Body  */}
        <div className="w-full h-full bg-zinc-50 flex flex-col-reverse flex-1 max-h-full overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-zinc-300 px-2 py-6 sm:px-4 sm:py-8">
          {messages.map((message, index) => {
            const sender =
              convUsers.filter((user) => user.id === message.senderId)[0] ||
              currentUser;
            const seenUsersNamesList = convUsers
              .filter(
                (user) =>
                  message.seenUserIds.includes(user.id) &&
                  message.senderId !== currentUser.id
              )
              .map((filteredUsers) => filteredUsers.firstName)
              .join(", ");

            if (index === messages.length - 1) {
              return (
                <MessageBox
                  ref={ref}
                  key={index}
                  sender={sender}
                  message={message}
                  isLast={index === 0}
                  iAmSender={sender.id === currentUser?.id}
                  seenUsersNamesList={seenUsersNamesList}
                />
              );
            }

            return (
              <MessageBox
                key={index}
                sender={sender}
                message={message}
                isLast={index === 0}
                iAmSender={sender.id === currentUser?.id}
                seenUsersNamesList={seenUsersNamesList}
              />
            );
          })}

          {status === "Exhausted" && messages.length > 25 && (
            <p className="w-full text-center text-sm text-zinc-700">
              No More Messages
            </p>
          )}
        </div>

        <Footer updateMyPresence={updateMyPresence} />
      </div>
    </div>
  );
};
