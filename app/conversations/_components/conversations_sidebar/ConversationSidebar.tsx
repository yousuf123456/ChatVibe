import React from "react";

import Image from "next/image";
import clsx from "clsx";

import { SignOutButton } from "@clerk/nextjs";

import { LogOut } from "lucide-react";

import { UserProfileDrawer } from "./UserProfileDrawer";
import { Conversations } from "./Conversations";

export const ConversationSidebar = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  // Stores the state whether the conversations currently showing are group chats or not
  // const [isGroup, setIsgroup] = useState<boolean>(false);

  // const { conversationId, isOpen } = useConversation();

  // const conversations = useQuery(api.conversations.get, {});

  console.log(conversationId);
  return (
    <>
      <div
        className={clsx(
          "fixed w-full h-full mb-20 z-50 lg:mb-0 lg:w-80 lg:h-full lg:overflow-y-auto lg:flex flex-col border-slate-200 bg-white",
          conversationId ? "hidden" : "flex"
        )}
      >
        <div className="w-full border-slate-200">
          <div className="sm:py-2 py-1 h-full lg:py-4 max-[440px]:px-4 max-sm:px-8 relative">
            <div className="h-full w-full flex py-3 lg:py-4 gap-4 items-center sm:justify-center">
              <div className="w-[40px] h-[20px] sm:w-[50px] sm:h-[25px] relative">
                <Image alt="Logo" src={"/images/logo.png"} fill />
              </div>

              <h1 className="text-xl sm:text-2xl bg-gradient-to-b from-black to-pink-500 font-nunito font-medium bg-clip-text text-transparent">
                ChatVibe
              </h1>
            </div>

            {/* Shown in mobile devices only on the top */}
            <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 lg:hidden">
              <UserProfileDrawer />
            </div>
          </div>
        </div>

        <Conversations />

        {/* Shown in desktop devices only on the bottom */}
        <div className="fixed hidden lg:block bottom-0 left-0 w-80 px-3 py-1.5 border-t-[1px] border-slate-200 z-[51]">
          <div className="flex items-center justify-between">
            <UserProfileDrawer />

            <SignOutButton>
              <LogOut className="w-6 h-6 text-gray-700" />
            </SignOutButton>
          </div>
        </div>
      </div>
    </>
  );
};
