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

interface ConversationMetaDrawerProps {
  conversation: Doc<"conversations">;
  convUsers: User[];
}

export const ConversationMetaDrawer: React.FC<ConversationMetaDrawerProps> = ({
  conversation,
  convUsers,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const otherUser = convUsers[0];

  const remove = useMutation(api.conversation.remove);

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
                  {otherUser.emailAddresses[0]?.emailAddress}
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
              <Button variant={"destructive"}>Delete</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Conversation</DialogTitle>
                <DialogDescription>
                  This action cannot be undone! This will completely remove
                  your&apos;s conversation with this user. Do you want to delete
                  this user ?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose>
                  <Button variant={"ghost"}>Cancel</Button>
                </DialogClose>

                <Button
                  onClick={onDelete}
                  disabled={isLoading}
                  variant={"destructive"}
                >
                  Delete
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SheetContent>
    </Sheet>
  );
};
