import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import clsx from "clsx";
import { format } from "date-fns";

import { useUser } from "@clerk/nextjs";

import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { cn } from "@/lib/utils";

import { Avatar } from "@/app/conversations/_components/Avatar";
import { GroupAvatar } from "@/app/conversations/_components/GroupAvatar";

import { FullConversationType } from "@/app/_types";
import { useUsersList } from "@/app/_hooks/useUsersList";
import { ConversationBoxLoading } from "./ConversationBoxLoading";

interface conversationBoxProps {
  selected: boolean;
  conversation: FullConversationType;
}

export const ConversationBox: React.FC<conversationBoxProps> = ({
  selected,
  conversation,
}) => {
  const router = useRouter();

  const { users: convUsers, isLoaded: isConvUsersLoaded } = useUsersList(
    conversation.userIds
  );

  // Retrieve the last few messages to show the last message in the conversation box
  const { results: messages } = usePaginatedQuery(
    api.conversation.getMessages,
    {
      conversationId: conversation._id,
    },
    { initialNumItems: 5 }
  );

  const lastMessage = useMemo(() => {
    if (!messages) return;

    return messages[0];
  }, [messages]);

  // Text to show about the last message in the conversation box
  const lastMessageText = useMemo(() => {
    let lastMessageText;
    if (lastMessage) {
      if (lastMessage.image) {
        return (lastMessageText = `${lastMessage.senderName} sent an image`);
      }
    }

    if (!lastMessage) {
      return (lastMessageText = "Just created a conversation");
    }

    return (lastMessageText = lastMessage.body);
  }, [lastMessage]);

  const { user, isLoaded } = useUser();

  const currentUserId = useMemo(() => {
    if (!user) return null;

    return user.id;
  }, [user, isLoaded]);

  // Check to see if last message has been seen
  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    if (!currentUserId) {
      return false;
    }

    return lastMessage.seenUserIds.includes(currentUserId);
  }, [lastMessage, currentUserId]);

  // Calc number of messages that are unseen
  const unseenMessageCount = useMemo(() => {
    if (!lastMessage || messages?.length === 0) return 0;

    let count = 0;

    if (currentUserId && messages) {
      for (let i = 0; i <= messages.length - 1; i++) {
        const message = messages[i];
        if (message.seenUserIds.includes(currentUserId)) {
          break;
        }

        count += 1;
      }
    }

    return count;
  }, [currentUserId, messages]);

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation._id}`);
  }, [router, conversation._id]);

  if (!messages || !isConvUsersLoaded) {
    return <ConversationBoxLoading />;
  }

  if (!convUsers || (convUsers && convUsers.length === 0))
    return (
      <p>
        No other user realted to this conversation. It seems to be a one sided
        conversation.
      </p>
    );

  return (
    <div
      className={cn(
        "relative flex flex-row gap-4 px-3 py-2 items-center bg-white hover:bg-zinc-50 transition-all cursor-pointer",
        selected && "bg-zinc-50"
      )}
      onClick={handleClick}
    >
      {conversation.isGroup ? (
        <div className="relative w-14 h-14 rounded-full overflow-hidden">
          <GroupAvatar users={convUsers} size="h-5 w-5" />
        </div>
      ) : (
        <div className="relative w-10 h-10">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Avatar image={convUsers[0].imageUrl} />
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-start">
        <p
          className={clsx(
            "text-md font-nunito font-medium line-clamp-1 max-w-[168px]",
            "text-black"
          )}
        >
          {conversation.isGroup ? conversation.name : convUsers[0].firstName}
        </p>

        <p
          className={cn(
            "text-sm font-white font-roboto font-extralight line-clamp-1 max-w-[200px] text-black",
            hasSeen ? "opacity-70" : "opacity-100"
          )}
        >
          {lastMessageText}
        </p>
      </div>

      {lastMessage?._creationTime && (
        <p
          className={clsx(
            "text-xs font-light absolute top-1 right-2",
            unseenMessageCount !== 0 && !selected
              ? "text-pink-500 font-medium opacity-100"
              : "text-black opacity-80"
          )}
        >
          {format(new Date(lastMessage?._creationTime!), "h:mm a")}
        </p>
      )}

      {unseenMessageCount !== 0 && (
        <div
          className={cn(
            "absolute flex justify-center items-center right-2 bottom-2 w-5 h-5 rounded-full bg-pink-500"
          )}
        >
          <p className={cn("text-xs font-roboto text-white")}>
            {unseenMessageCount}
          </p>
        </div>
      )}
    </div>
  );
};
