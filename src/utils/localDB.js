const FRIENDS_STORAGE_KEY = "keenkeeper-friends";
const TIMELINE_STORAGE_KEY = "keenkeeper-timeline";

export function getFriendsFromLocalDB() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedFriends = window.localStorage.getItem(FRIENDS_STORAGE_KEY);
    return storedFriends ? JSON.parse(storedFriends) : [];
  } catch {
    return [];
  }
}

export function saveFriendsToLocalDB(friends) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(FRIENDS_STORAGE_KEY, JSON.stringify(friends));
}

export function getTimelineFromLocalDB() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedTimeline = window.localStorage.getItem(TIMELINE_STORAGE_KEY);
    return storedTimeline ? JSON.parse(storedTimeline) : [];
  } catch {
    return [];
  }
}

export function saveTimelineToLocalDB(timeline) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(timeline));
}
