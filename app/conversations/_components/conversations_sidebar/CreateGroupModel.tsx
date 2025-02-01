import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar } from "@/app/conversations/_components/Avatar";

import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { BsPersonAdd } from "react-icons/bs";

import { FieldValues, useForm } from "react-hook-form";

import { useDebounce } from "use-debounce";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";

import axios from "axios";

export const CreateGroupModel = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchedUsers, setSearchedUsers] = useState<
    { emailAddress: string; imageUrl: string; id: string }[]
  >([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const { register, watch, getValues } = useForm<FieldValues>({
    defaultValues: {
      search: "",
      groupName: "",
    },
  });

  const searchTerm = watch("search");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // Get the list of users relevant to the search term whenever user types in the search field
  useEffect(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length < 3) return;

    axios
      .post("../../api/searchUsers", { email_id: debouncedSearchTerm })
      .then(({ data }) => {
        const selectedSearchedUsers = searchedUsers.filter((user) =>
          selectedUserIds.includes(user.id)
        );

        setSearchedUsers([...selectedSearchedUsers, ...data]);
      })
      .catch((e) => console.log(e));
  }, [debouncedSearchTerm]);

  // Add or Remove userId from the list when chechbox gets checked/unchecked
  const handleCheckboxChange = (userId: string) => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds((userIds) =>
        userIds.filter((userId) => userId !== userId)
      );
    } else {
      setSelectedUserIds((userIds) => [...userIds, userId]);
    }
  };

  const createConversation = useMutation(api.conversation.create);

  const onCreate = () => {
    if (selectedUserIds.length === 0) return;
    setIsLoading(true);

    createConversation({
      userIds: selectedUserIds,
      isGroup: true,
      groupName: getValues().groupName,
    })
      .then((res) => {
        setOpen(false);
        setSearchedUsers([]);
        setSelectedUserIds([]);
        router.push(`/conversations/${res}`);
        toast.success("Succesfully Created The Conversation");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <BsPersonAdd className="h-6 w-6 text-indigo-950" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Group</DialogTitle>
        </DialogHeader>

        <div className="mt-8 flex flex-col gap-5">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="picture">Group Name</Label>

            <Input
              type="text"
              id="groupName"
              required={true}
              disabled={isLoading}
              {...register("groupName")}
              placeholder="Type Group Name"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="search">Search Members</Label>

            <Input
              id="search"
              type="text"
              required={true}
              disabled={isLoading}
              {...register("search")}
              placeholder="Type Users Email/Id"
            />
          </div>
        </div>

        {searchedUsers.length > 0 && (
          <div className="flex flex-col gap-2">
            {searchedUsers.map((user, i) => (
              <div
                key={i}
                className="p-2.5 bg-gray-100 rounded-md flex justify-between w-full items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7">
                    <Avatar image={user.imageUrl} />
                  </div>

                  <p className="text-sm text-gray-800 font-medium">
                    {user.emailAddress}
                  </p>
                </div>

                <Checkbox
                  className="border-black data-[state=checked]:bg-black data-[state=checked]:text-white"
                  checked={selectedUserIds.includes(user.id)}
                  onClick={() => handleCheckboxChange(user.id)}
                />
              </div>
            ))}
          </div>
        )}

        <DialogFooter className="mt-10">
          <div className="flex gap-2 w-full justify-end">
            <DialogClose>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>

            <Button
              onClick={onCreate}
              disabled={isLoading || selectedUserIds.length === 0}
            >
              Create {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
