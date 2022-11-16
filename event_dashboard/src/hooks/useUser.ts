import { useEffect, useState } from "react";
import { User } from "../models/user";
import { getUserById } from "../services/auth-service";
import useFirebaseUser from "./useFirebaseUser";

export default function useUser() {
  const { user: fbUser } = useFirebaseUser();
  const [user, setUser] = useState<User | null>(null);
  const getUser = async () => {
    const fetched = await getUserById(fbUser!.uid);
    setUser(fetched);
  };
  useEffect(() => {
    if (fbUser) {
      getUser();
    }
  }, [fbUser]);

  return { user, getUser };
}
