"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { AddUserModel } from "./AddUserModel";
import { CreateGroupModel } from "./CreateGroupModel";
import { ConversationBox } from "./ConversationBox";
import { useParams } from "next/navigation";

export const ConversationsList = ({
  conversations,
}: {
  conversations: any[];
}) => {
  const params = useParams();
  const conversationId = params.conversationId;

  const [isGroup, setIsgroup] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-end px-3">
        <div className="flex justify-around w-full mt-8 lg:mt-6">
          <p
            onClick={() => setIsgroup(false)}
            className={clsx(
              "text-base font-poppins",
              !isGroup ? "text-indigo-950 underline" : "opacity-50"
            )}
          >
            Chats
          </p>

          <p
            onClick={() => setIsgroup(true)}
            className={clsx(
              "text-base font-poppins",
              isGroup ? "text-indigo-950 underline" : "opacity-50"
            )}
          >
            Groups
          </p>
        </div>

        {!isGroup && <AddUserModel />}

        {isGroup && <CreateGroupModel />}
      </div>

      <div className="mt-8 flex flex-col gap-0">
        {conversations.map((conversation) => {
          if (conversation.isGroup === isGroup) {
            return (
              <ConversationBox
                key={conversation._id}
                conversation={conversation}
                selected={conversationId === conversation._id}
              />
            );
          }
        })}
        {/* {conversations ? (
          conversations.map((conversation) => {
            if (conversation.isGroup === isGroup) {
              return (
                <ConversationBox
                  key={conversation._id}
                  conversation={conversation}
                  selected={conversationId === conversation._id}
                />
              );
            }
          })
        ) : (
          <div className="mt-4 w-full flex justify-center items-center flex-col gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />

            <p className="text-zinc-600">Loading Chats</p>
          </div>
        )} */}
      </div>
    </div>
  );
};
