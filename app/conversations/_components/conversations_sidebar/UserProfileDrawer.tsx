"use client";
import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar } from "../Avatar";
import { Button } from "@/components/ui/button";

import { SignOutButton, useClerk, useUser } from "@clerk/nextjs";

import { LogOut } from "lucide-react";

export const UserProfileDrawer = () => {
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  return (
    <Sheet defaultOpen={false}>
      <SheetTrigger>
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex flex-col items-center">
          <Avatar image={user?.imageUrl} />
        </div>
      </SheetTrigger>

      <SheetContent
        position="left"
        className="w-full min-[420px]:max-w-xl sm:max-w-sm pt-0 px-0 text-white"
      >
        <SheetHeader>
          <SheetTitle className="font-nunito font-medium text-xl px-6 py-3">
            Profile
          </SheetTitle>

          <SheetDescription className="px-6 pt-4">
            <div className="w-full flex flex-col items-center">
              <div className="relative">
                <div className="w-16 h-16 relative rounded-full overflow-hidden">
                  <Avatar image={user?.imageUrl} />
                </div>
              </div>

              <div className="w-full flex flex-col items-start mt-6">
                <div className="w-full flex justify-between items-center">
                  <p className="text-sm text-zinc-500 font-roboto font-light">
                    Name
                  </p>
                </div>

                <p className="text-base font-medium font-nunito text-black">
                  {user?.firstName + " " + user?.lastName}
                </p>
              </div>

              <div className="w-full flex flex-col items-start mt-6">
                <p className="text-sm text-zinc-500 font-roboto font-light">
                  Email
                </p>

                <p className="text-base font-medium font-nunito text-black">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>

              <div className="w-full flex flex-col items-start mt-6">
                <p className="text-sm text-zinc-500 font-roboto font-light">
                  Id
                </p>

                <p className="text-base font-medium font-nunito text-black">
                  {user?.id}
                </p>
              </div>

              <div className="w-full flex flex-col gap-5 mt-12">
                <SheetClose>
                  <Button
                    className="w-full"
                    variant={"secondary"}
                    onClick={() => openUserProfile()}
                  >
                    Manage Account
                  </Button>
                </SheetClose>

                <SignOutButton>
                  <Button
                    className="w-full text-foreground"
                    variant={"outline"}
                  >
                    Logout <LogOut className="w-4 h-4 ml-2" />
                  </Button>
                </SignOutButton>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
