/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { getFriendsFromLocalDB, saveFriendsToLocalDB } from "../utils/localDB.js";

const FriendContext = createContext(null);

const DEFAULT_METRICS = {
  totalFriends: 10,
  onTrack: 3,
  needAttention: 6,
  interactionsThisMonth: 12,
};

export function FriendProvider({ children }) {
  const [friends, setFriends] = useState(() => getFriendsFromLocalDB());
  const [isLoading, setIsLoading] = useState(friends.length === 0);

  useEffect(() => {
    let cancelled = false;

    async function loadFriends() {
      try {
        const response = await fetch("/friends.json");
        const data = await response.json();

        if (!cancelled) {
          setFriends(data);
          setIsLoading(false);
          saveFriendsToLocalDB(data);
        }
      } catch {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadFriends();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <FriendContext.Provider
      value={{
        friends,
        isLoading,
        metrics: DEFAULT_METRICS,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
}

export function useFriendContext() {
  const context = useContext(FriendContext);

  if (!context) {
    throw new Error("useFriendContext must be used within FriendProvider");
  }

  return context;
}
