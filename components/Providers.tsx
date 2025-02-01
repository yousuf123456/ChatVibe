"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

import Image from "next/image";

import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  useAuth,
} from "@clerk/nextjs";

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      >
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
          <ClerkLoading>
            <div className="flex items-center justify-center h-full flex-col gap-3">
              <div className=" animate-pulse">
                <Image
                  width={100}
                  height={100}
                  src={"/images/logo.png"}
                  alt="Application Logo"
                />
              </div>
            </div>
          </ClerkLoading>

          <ClerkLoaded>{children}</ClerkLoaded>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </>
  );
};
