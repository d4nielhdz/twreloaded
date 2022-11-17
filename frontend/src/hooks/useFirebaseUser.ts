import { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { logAppOpened } from "../services/actions-service";

export default function useFirebaseUser() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    const logOpen = async () => {
      if (user) {
        await logAppOpened(user.uid);
      }
    };
    let isMounted = true;
    const uns = auth.onAuthStateChanged((user) => {
      if (user) {
        logOpen();
      }
    });
    const unsuscribe = auth.onIdTokenChanged((user) => {
      if (!isMounted) return;
      setUser(user);
      setHasLoaded(true);
    });
    return () => {
      isMounted = false;
      unsuscribe();
      uns();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return { user, hasLoaded };
}
