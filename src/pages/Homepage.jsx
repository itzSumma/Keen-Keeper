import Banner from "../components/Banner.jsx";
import SummaryCards from "../components/SummaryCards.jsx";
import AllFriends from "../components/AllFriends.jsx";
import { useFriendContext } from "../context/FriendContext.jsx";

export default function Homepage() {
  const { metrics } = useFriendContext();

  return (
    <div className="space-y-14">
      <Banner />
      <SummaryCards metrics={metrics} />
      <AllFriends />
    </div>
  );
}
