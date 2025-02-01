"use client";

import toast from "react-hot-toast";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Avatar } from "@/app/conversations/_components/Avatar";
import { ConversationUser } from "@/app/_types";

interface MemberBoxProps {
  user: ConversationUser;
}

export const MemberBox: React.FC<MemberBoxProps> = ({ user }) => {
  const { user: currentUser, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const me = currentUser?.id === user.id;

  const createConversation = useMutation(api.conversation.create);

  const handleClick = () => {
    if (me || !isLoaded || !isSignedIn) return;

    createConversation({ userIds: [user.id], isGroup: false }).then((res) => {
      toast.success("Succesfully Created The Conversation");
      router.push(`/conversations/${res}`);
    });
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100"
    >
      <div className="w-8 h-8 relative rounded-full overflow-hidden">
        <Avatar image={user.imageUrl} />
      </div>

      <p className="text-sm font-medium text-indigo-950">
        {me ? "You" : user.firstName}
      </p>
    </div>
  );
};
