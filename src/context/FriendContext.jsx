/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getFriendsFromLocalDB,
  saveFriendsToLocalDB,
} from "../utils/localDB.js";

const FriendContext = createContext(null);

const STATUS_VALUES = ["overdue", "almost due", "on-track"];

function getInitialFriends() {
  return getFriendsFromLocalDB().map(normalizeFriend);
}

function parseDate(value) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? null : parsed;
}

function normalizeFriend(friend) {
  const fallbackTag = Array.isArray(friend.tags) && friend.tags.length > 0 ? friend.tags : [friend.tag ?? "friend"];
  const status = STATUS_VALUES.includes(friend.status) ? friend.status : "on-track";

  return {
    ...friend,
    tags: fallbackTag,
    status,
  };
}

export function FriendProvider({ children }) {
  const [friends, setFriends] = useState(getInitialFriends);
  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(() => getInitialFriends().length === 0);

  useEffect(() => {
    let cancelled = false;

    async function loadFriends() {
      try {
        const response = await fetch("/friends.json");
        const data = await response.json();

        if (!cancelled) {
          const normalized = data.map(normalizeFriend);
          setFriends(normalized);
          setIsLoading(false);
          saveFriendsToLocalDB(normalized);
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

  const sortedTimeline = useMemo(
    () =>
      [...timeline].sort((a, b) => {
        const first = parseDate(a.date)?.valueOf() ?? 0;
        const second = parseDate(b.date)?.valueOf() ?? 0;
        return second - first;
      }),
    [timeline],
  );

  const interactionCounts = useMemo(
    () =>
      sortedTimeline.reduce(
        (acc, item) => {
          if (item.type in acc) {
            acc[item.type] += 1;
          }
          return acc;
        },
        { call: 0, text: 0, video: 0 },
      ),
    [sortedTimeline],
  );

  const metrics = useMemo(() => {
    const totalFriends = friends.length;
    const onTrack = friends.filter((friend) => friend.status === "on-track").length;
    const needAttention = friends.filter((friend) => friend.status !== "on-track").length;
    const now = new Date();
    const interactionsThisMonth = sortedTimeline.filter((entry) => {
      const date = parseDate(entry.date);
      if (!date) {
        return false;
      }
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    return {
      totalFriends,
      onTrack,
      needAttention,
      interactionsThisMonth,
    };
  }, [friends, sortedTimeline]);

  function addInteraction(friend, type) {
    const id = `event-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const label = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
    const newEntry = {
      id,
      friendId: friend.id,
      type,
      date: new Date().toISOString(),
      title: `${label} with ${friend.name}`,
      source: "user",
    };

    setTimeline((current) => [newEntry, ...current]);
    return newEntry;
  }

  return (
    <FriendContext.Provider
      value={{
        friends,
        isLoading,
        metrics,
        timeline: sortedTimeline,
        interactionCounts,
        addInteraction,
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
