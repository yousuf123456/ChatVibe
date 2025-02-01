"use client";
import React, { useEffect } from "react";

import { useUser } from "@clerk/nextjs";

import { useMutation, usePaginatedQuery, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useInView } from "react-intersection-observer";
import usePresence from "@/app/_hooks/usePresence";
import useConversation from "@/app/_hooks/useConversation";
import { useConversationUsers } from "@/app/_hooks/useConversationUsers";

import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { MessageBox } from "./_components/MessageBox";
import { EmptyState } from "@/app/(site)/components/EmptyState";

import Loading from "./loading";

export default function ConversationIdPage() {
  const { user } = useUser();

  const { conversationId } = useConversation();

  // Get the conversation metadata such as name, usersIds etc
  const conversation = useQuery(api.conversation.get, { conversationId });

  const { convUsers, isLoaded: isConvUsersLoaded } =
    useConversationUsers(conversationId);

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
    if (!user || status === "LoadingFirstPage" || !(messages.length > 0))
      return;

    if (messages[0].seenUserIds.includes(user.id)) return;

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
  }>(conversationId, user?.id || "unknown", {
    typing: false,
  });

  if (
    !isConvUsersLoaded ||
    status === "LoadingFirstPage" ||
    conversation === undefined
  ) {
    return <Loading />;
  }

  if (!user) return <p>Unauthorized</p>;

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
              user;
            const seenUsersNamesList = convUsers
              .filter((user) => message.seenUserIds.includes(user.id))
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
                  iAmSender={sender.id === user?.id}
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
                iAmSender={sender.id === user?.id}
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
}
