import { useEffect, useState } from "react";
import { User } from "@clerk/nextjs/dist/types/server";

import axios from "axios";

export const useConversationUsers = (
  conversationId: string
):
  | { convUsers: User[]; isLoaded: true }
  | { convUsers: undefined; isLoaded: false } => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [convUsers, setConvUsers] = useState<User[] | undefined>();

  // Get the users connected to this conversation from the users database
  useEffect(() => {
    axios
      .post("/api/getUsers", {
        conversationId,
      })
      .then((res) => {
        setIsLoaded(true);
        setConvUsers(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return { convUsers, isLoaded } as any;
};
