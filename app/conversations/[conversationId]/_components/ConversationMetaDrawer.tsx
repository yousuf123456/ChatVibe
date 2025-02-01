import React, { useState } from "react";

import clsx from "clsx";
import toast from "react-hot-toast";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MemberBox } from "./MemberBox";
import { Button } from "@/components/ui/button";
import { Avatar } from "../../_components/Avatar";

import { HiDotsHorizontal } from "react-icons/hi";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { User } from "@clerk/nextjs/dist/types/server";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ConversationUser } from "@/app/_types";
import { useAuth } from "@clerk/nextjs";

interface ConversationMetaDrawerProps {
  conversation: Doc<"conversations">;
  convUsers: ConversationUser[];
}

export const ConversationMetaDrawer: React.FC<ConversationMetaDrawerProps> = ({
  conversation,
  convUsers,
}) => {
  const { userId } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const otherUser = convUsers[0];

  const remove = useMutation(api.conversation.remove);
  const leave = useMutation(api.conversation.leave);

  const router = useRouter();

  const onDelete = () => {
    setIsLoading(true);

    remove({ conversationId: conversation._id })
      .then((res) => {
        toast.success(res);
        router.push("/conversations");
      })
      .catch((e) => toast.error("Something went wrong."))
      .finally(() => setIsLoading(false));
  };

  const onLeave = () => {
    if (!userId) return;

    setIsLoading(true);

    leave({
      conversationId: conversation._id,
      updatedUserIds: conversation.userIds.filter((uId) => uId !== userId), // Exclude the current userId from convoUserIds
    })
      .then((res) => {
        toast.success(res);
        router.push("/conversations");
      })
      .catch((e) => toast.error("Something went wrong."))
      .finally(() => setIsLoading(false));
  };

  const isMoreThanTwoUsers = conversation.userIds.length > 2;

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"} size={"icon"}>
          <HiDotsHorizontal className="sm:w-6 sm:h-6 w-5 h-5 text-zinc-500 transition-all hover:text-zinc-600 cursor-pointer" />
        </Button>
      </SheetTrigger>

      <SheetContent
        position="right"
        className="w-full min-[420px]:max-w-xl sm:max-w-sm"
      >
        <SheetHeader className="mt-2">
          {!conversation.isGroup && (
            <div className="w-full flex flex-row justify-center">
              <div className="relative w-16 h-16">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Avatar image={otherUser.imageUrl} />
                </div>
              </div>
            </div>
          )}

          <SheetDescription>
            <div className="w-full flex flex-col justify-center items-center">
              <p
                className={clsx(
                  "font-medium text-indigo-950",
                  conversation.name ? "text-xl" : "text-base"
                )}
              >
                {conversation.name || otherUser.firstName}
              </p>
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-12 flex flex-col gap-4">
          {!conversation.isGroup && (
            <>
              <div className="pl-2 flex flex-col">
                <p className="text-sm font-light text-zinc-500">Email</p>
                <p className="text-sm sm:text-base font-nunito font-medium text-black">
                  {otherUser.emailAddress}
                </p>
              </div>

              <div className="pl-2 flex flex-col">
                <p className="text-sm font-light text-zinc-500">Id</p>
                <p className="text-sm sm:text-base font-nunito font-medium text-black">
                  {otherUser.id}
                </p>
              </div>
            </>
          )}

          <div className="pl-2 flex flex-col">
            <p className="text-sm font-light text-zinc-500">Joined On</p>
            <p className="text-sm lg:text-base font-nunito font-medium text-black">
              {new Date(conversation._creationTime).toLocaleString()}
            </p>
          </div>

          <div className="w-full pl-2 flex flex-col mt-4">
            {conversation.isGroup && (
              <>
                <p className="text-sm font-light text-zinc-500">Members</p>

                <div className="w-full max-h-80 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-blue-200 flex flex-col mt-1">
                  {convUsers.map((user) => {
                    return <MemberBox user={user} key={user.id} />;
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-12 flex w-full justify-end px-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
              <Button variant={"destructive"}>
                {isMoreThanTwoUsers ? "Leave" : "Delete"}
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isMoreThanTwoUsers ? "Leave" : "Delete"} Conversation
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone! This will completely remove
                  your&apos;s conversation. Do you want to{" "}
                  {isMoreThanTwoUsers ? "leave " : "delete "}
                  this conversation ?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose>
                  <Button variant={"ghost"}>Cancel</Button>
                </DialogClose>

                {/* When the conversation is between only two users, 
                give users the option to delete the convo */}
                {conversation.userIds.length < 3 && (
                  <Button
                    onClick={onDelete}
                    disabled={isLoading}
                    variant={"destructive"}
                  >
                    Delete
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  </Button>
                )}

                {/* When the conversation is between more than two users, 
                give users the option to leave the convo */}
                {conversation.userIds.length > 2 && (
                  <Button
                    onClick={onLeave}
                    disabled={isLoading}
                    variant={"destructive"}
                  >
                    Leave
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SheetContent>
    </Sheet>
  );
};
