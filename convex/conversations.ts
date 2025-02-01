import { User } from "@clerk/nextjs/dist/types/server";

import { query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export type FullConversationType = Doc<"conversations"> & {
  convUsers?: User[];
  messages?: Doc<"messages">[];
};

export const get = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const conversationIds = (
      await ctx.db
        .query("userConversationRelation")
        .filter((q) => q.eq(q.field("userId"), identity.subject))
        .collect()
    ).map(
      (userConversationRel) => userConversationRel.conversationId
    ) as Id<"conversations">[];

    let conversations: FullConversationType[] = [];
    conversations = await getAllOrThrow(ctx.db, conversationIds);

    return conversations;
  },
});
