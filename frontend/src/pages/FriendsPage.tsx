import {
  useEffect,
} from "react";

import MainLayout from "../layouts/MainLayout";

import GlassPanel from "../components/ui/GlassPanel";

import {
  getFriends,
} from "../api/friends.api";

import {
  useFriendsStore,
} from "../store/friendsStore";

export default function FriendsPage() {
  const {
    friends,
    setFriends,
  } = useFriendsStore();

  useEffect(() => {
    loadFriends();
  }, []);

  async function loadFriends() {
    try {
      const data = await getFriends();

      setFriends(data.friends);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <MainLayout>
      <GlassPanel className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          Amigos
        </h2>

        <div className="space-y-3">
          {friends.map(
            (friend) => (
              <div
                key={friend.id}
                className="
                  flex
                  justify-between
                  border-b
                  border-white/10
                  pb-2
                "
              >
                <span>
                  {
                    friend.username
                  }
                </span>

                <span>
                  {friend.online
                    ? "🟢"
                    : "⚫"}
                </span>
              </div>
            )
          )}
        </div>
      </GlassPanel>
    </MainLayout>
  );
}