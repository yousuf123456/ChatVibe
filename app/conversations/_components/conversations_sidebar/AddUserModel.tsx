"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";

import { BsPlus } from "react-icons/bs";
import { Avatar } from "@/app/conversations/_components/Avatar";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export function AddUserModel() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email_id, setEmail_id] = useState("");
  const [debouncedEmail_id] = useDebounce(email_id, 500);

  const [searchedUsers, setSearchedUsers] = useState<
    { emailAddress: string; imageUrl: string; id: string }[]
  >([]);
  const [userId, setUserId] = useState<string | null>();

  // Get the list of users relevant to the search term whenever user types in the search field
  useEffect(() => {
    if (!debouncedEmail_id) return;

    axios
      .post("../../api/searchUsers", { email_id: debouncedEmail_id })
      .then((res) => setSearchedUsers(res.data))
      .catch((e) => console.log(e));
  }, [debouncedEmail_id]);

  const createConversation = useMutation(api.conversation.create);

  const onCreateConversation = () => {
    if (!userId) return;
    setIsLoading(true);

    createConversation({ userIds: [userId], isGroup: false })
      .then((res) => {
        setOpen(false);
        setUserId(null);
        setSearchedUsers([]);
        router.push(`/conversations/${res}`);
        toast.success("Succesfully Created The Conversation");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <BsPlus className="w-6 h-6 text-indigo-950" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Conversation</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-8">
          <Label htmlFor="search">Search User by Email or Id</Label>

          <div className="relative flex flex-col gap-4">
            <Input
              id="search"
              type="text"
              value={email_id}
              disabled={isLoading}
              placeholder="Type user email or id"
              onChange={(e) => setEmail_id(e.target.value)}
            />

            {searchedUsers.length > 0 && (
              <RadioGroup value={userId || ""}>
                <div className="flex flex-col gap-2">
                  {searchedUsers.map((user, i) => (
                    <div
                      key={i}
                      onClick={() => setUserId(user.id)}
                      className="p-2 rounded-md bg-gray-100 flex justify-between w-full items-center cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7">
                          <Avatar image={user.imageUrl} />
                        </div>

                        <p className="text-sm font-medium text-gray-800">
                          {user.emailAddress}
                        </p>
                      </div>

                      <RadioGroupItem
                        value={user.id}
                        id={user.id}
                        className="border-black data-[state=checked]:bg-black data-[state=checked]:text-white"
                      />
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {searchedUsers.length === 0 && (
              <p className="w-full text-center text-base font-medium text-gray-700">
                No Users Found
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-12">
          <div className="flex gap-2 w-full justify-end">
            <DialogClose>
              <Button
                variant={"secondary"}
                onClick={() => {
                  setUserId(null);
                  setEmail_id("");
                }}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              onClick={onCreateConversation}
              disabled={isLoading || !userId}
            >
              Create
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
