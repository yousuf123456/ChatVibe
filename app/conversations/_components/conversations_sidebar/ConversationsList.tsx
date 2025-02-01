"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";

import clsx from "clsx";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { AddUserModel } from "./AddUserModel";
import { CreateGroupModel } from "./CreateGroupModel";
import { ConversationBox } from "./ConversationBox";
import { Loader2 } from "lucide-react";
import { ConversationBoxLoading } from "./ConversationBoxLoading";

export const ConversationsList = () => {
  const conversations = useQuery(api.conversations.get, {});

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
        {conversations ? (
          conversations.map((conversation) => (
            <div
              key={conversation._id}
              className={clsx(isGroup === conversation.isGroup ? "" : "hidden")}
            >
              <ConversationBox
                conversation={conversation}
                selected={conversationId === conversation._id}
              />
            </div>
          ))
        ) : (
          <>
            <ConversationBoxLoading />
            <ConversationBoxLoading />
            <ConversationBoxLoading />
          </>
        )}
      </div>
    </div>
  );
};
