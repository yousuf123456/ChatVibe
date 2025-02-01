import React from "react";

import { Avatar } from "../../_components/Avatar";
import { ActiveDot } from "@/app/conversations/[conversationId]/_components/activeDot";
import { User } from "@clerk/nextjs/dist/types/server";
import { Doc } from "@/convex/_generated/dataModel";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PresenceData } from "@/app/_hooks/usePresence";

interface ConversationUserProps {
  convUsers: User[];
  conversation: Doc<"conversations">;
  othersPresence:
    | PresenceData<{
        typing: boolean;
      }>[]
    | undefined;
}

export const ConversationUsers: React.FC<ConversationUserProps> = ({
  conversation,
  convUsers,
  othersPresence,
}) => {
  const otherUser = convUsers[0];

  const heartbeats = useQuery(api.presence.getHeartbeats, {
    userIds: convUsers.map((user) => user.id),
  });

  const isUserTyping =
    (othersPresence || []).filter(
      (userPresenceData) =>
        userPresenceData.user === otherUser.id && userPresenceData.data.typing
    ).length > 0;

  // Get the list of users presennce data who are typing
  const typingUsers = (othersPresence || []).filter(
    (userPresenceData) => userPresenceData.data.typing
  );

  let typingUserNamesList = typingUsers.map((userPresenceData) => {
    const user = convUsers.filter(
      (user) => user.id === userPresenceData.user
    )[0];

    return user.firstName;
  });

  const typingUsersString = typingUserNamesList.join(", ").concat(" Typing...");

  const isUserOnline =
    (heartbeats || []).filter(
      (heartbeat) =>
        heartbeat.user === otherUser.id &&
        Date.now() - heartbeat.updated < 10000
    ).length > 0;

  return (
    <div className="flex gap-2 md:gap-4 items-center">
      {!conversation.isGroup && (
        <div className="relative">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full">
            {isUserOnline && <ActiveDot size="h-2.5 w-2.5" />}
            <Avatar image={otherUser.imageUrl} isActive={isUserOnline} />
          </div>
        </div>
      )}

      <div className="flex flex-col items-start gap-0">
        <p className="text-base sm:text-lg leading-none  md:text-xl font-nunito text-indigo-950 font-medium capitalize">
          {conversation.isGroup ? conversation.name : otherUser.firstName}
        </p>

        {!conversation.isGroup && isUserTyping && (
          <p className="text-sm text-zinc-500">Typing...</p>
        )}

        {conversation.isGroup && typingUsers.length > 0 && (
          <p className="text-sm text-zinc-500">{typingUsersString}</p>
        )}
      </div>

      {conversation.isGroup && (
        <div className="flex flex-col items-start gap-0">
          <div className="flex flex-row gap-[-5px] items-center">
            {convUsers.map((user, index) => {
              if (index < 5)
                return (
                  <div
                    key={index}
                    className="w-5 h-5 relative rounded-full overflow-hidden"
                  >
                    <Avatar image={user.imageUrl} />
                  </div>
                );
              else {
                return (
                  <div key={index}>
                    <p className="text-black text-2xl">.</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};
