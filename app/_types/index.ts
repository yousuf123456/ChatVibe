import { Doc } from "@/convex/_generated/dataModel";

export type ConversationUser = {
  emailAddress: string | undefined;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  id: string;
};

export type FullConversationType = Doc<"conversations"> & {
  // messages?: Doc<"messages">[];
  convUsers?: ConversationUser[];
};
