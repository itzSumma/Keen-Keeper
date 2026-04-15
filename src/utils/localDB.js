const FRIENDS_STORAGE_KEY = "keenkeeper-friends";

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
