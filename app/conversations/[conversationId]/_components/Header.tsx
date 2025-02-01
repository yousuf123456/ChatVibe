"use client";
import React from "react";

import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi2";

import { buttonVariants } from "@/components/ui/button";
import { ConversationUsers } from "./ConversationUsers";

import { Doc } from "@/convex/_generated/dataModel";
import { PresenceData } from "@/app/_hooks/usePresence";
import { ConversationMetaDrawer } from "./ConversationMetaDrawer";
import { ConversationUser } from "@/app/_types";

interface HeaderProps {
  convUsers: ConversationUser[];
  conversation: Doc<"conversations">;
  othersPresence:
    | PresenceData<{
        typing: boolean;
      }>[]
    | undefined;
}

export const Header: React.FC<HeaderProps> = ({
  conversation,
  convUsers,
  othersPresence,
}) => {
  return (
    <div className="flex flex-row z-50 bg-white justify-between sticky top-0 left-0 items-center p-3 sm:px-6">
      <div className="flex items-center gap-4">
        <Link
          href={"/conversations"}
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
            className: "lg:hidden",
          })}
        >
          <HiChevronLeft className="w-6 h-6 text-zinc-600" />
        </Link>

        <ConversationUsers
          convUsers={convUsers}
          conversation={conversation}
          othersPresence={othersPresence}
        />
      </div>

      <div className="flex items-center gap-3">
        <ConversationMetaDrawer
          conversation={conversation}
          convUsers={convUsers}
        />

        {/* <Sheet>
          <SheetTrigger>
            <Button variant={"ghost"} size={"icon"}>
              <HiDotsHorizontal className="sm:w-6 sm:h-6 w-5 h-5 text-zinc-500 transition-all hover:text-zinc-600 cursor-pointer" />
            </Button>
          </SheetTrigger>

          <Drawer conversation={conversation} otherUsers={convUsers} />
        </Sheet> */}
      </div>
    </div>
  );
};
