import { Link } from "react-router";
import { useFriendContext } from "../context/FriendContext.jsx";

const STATUS_META = {
  overdue: "bg-rose-100 text-rose-600",
  "almost due": "bg-amber-100 text-amber-700",
  "on-track": "bg-emerald-100 text-emerald-700",
};

function getAvatarSourceSet(url) {
  try {
    const parsed = new URL(url);

    if (!parsed.hostname.includes("unsplash.com")) {
      return { src: url, srcSet: undefined };
    }

    const oneX = new URL(parsed);
    oneX.searchParams.set("fit", "crop");
    oneX.searchParams.set("crop", "faces");
    oneX.searchParams.set("w", "128");
    oneX.searchParams.set("h", "128");
    oneX.searchParams.set("q", "90");
    oneX.searchParams.set("dpr", "1");

    const twoX = new URL(oneX);
    twoX.searchParams.set("dpr", "2");

    return {
      src: oneX.toString(),
      srcSet: `${oneX.toString()} 1x, ${twoX.toString()} 2x`,
    };
  } catch {
    return { src: url, srcSet: undefined };
  }
}

function Tag({ children }) {
  return (
    <span className="rounded-full bg-lime-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-lime-700">
      {children}
    </span>
  );
}

export default function FriendCard({ friend }) {
  const avatar = getAvatarSourceSet(friend.picture);
  const { addSelectedFriendId } = useFriendContext();

  return (
    <Link
      to={`/friends/${friend.id}`}
      onClick={() => addSelectedFriendId(friend.id)}
      className="block rounded-lg border border-slate-200 bg-white px-5 py-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <img
        src={avatar.src}
        srcSet={avatar.srcSet}
        sizes="64px"
        alt={friend.name}
        className="mx-auto h-16 w-16 rounded-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <h3 className="mt-4 text-base font-semibold text-slate-800">{friend.name}</h3>
      <p className="mt-1 text-xs text-slate-400">{friend.days_since_contact}d ago</p>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {friend.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="mt-2 flex justify-center">
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
            STATUS_META[friend.status]
          }`}
        >
          {friend.status}
        </span>
      </div>
    </Link>
  );
}
