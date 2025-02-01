import { useEffect, useState } from "react";

import { clerkClient } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/dist/types/server";

import axios from "axios";

export const useUsersList = (
  userId: string[]
): { users: User[] | undefined; isLoaded: boolean } => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState<User[] | undefined>();

  // Get the users connected to this conversation from the users database
  useEffect(() => {
    axios
      .post("/api/getUsers", {
        userId,
      })
      .then((res) => {
        setIsLoaded(true);
        setUsers(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return { users, isLoaded };
};
