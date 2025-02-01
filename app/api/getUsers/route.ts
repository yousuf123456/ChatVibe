import { api } from "@/convex/_generated/api";
import { ConvexClient } from "convex/browser";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

const convex = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  try {
    // An array of userIds to get users
    const { userId } = await request.json();

    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const users = await clerkClient.users.getUserList({
      userId,
    });

    return NextResponse.json(users.data);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
