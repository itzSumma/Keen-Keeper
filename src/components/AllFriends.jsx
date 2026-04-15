import { useFriendContext } from "../context/FriendContext.jsx";
import FriendCard from "./FriendCard.jsx";

function LoadingGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-56 animate-pulse rounded-lg border border-slate-200 bg-white"
        />
      ))}
    </div>
  );
}

export default function AllFriends() {
  const { friends, isLoading } = useFriendContext();

  return (
    <section>
      <h2 className="text-2xl font-semibold text-slate-800">Your Friends</h2>

      <div className="mt-6">
        {isLoading ? (
          <LoadingGrid />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
