import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";
import GlassPanel from "../components/ui/GlassPanel";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import {
  getFriends,
  sendFriendRequest,
  removeFriend,
} from "../api/friends.api";

import { searchUsers } from "../api/user.api";

import {
  useFriendsStore,
} from "../store/friendsStore";

import { socket } from "../socket/socket";

interface SearchUser {
  id: number;
  username: string;
  avatar_url?: string;
  online?: boolean;
}

export default function FriendsPage() {
  const {
    friends,
    setFriends,
    updateOnlineStatus,
  } = useFriendsStore();

  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState<SearchUser[]>([]);

  useEffect(() => {
    loadFriends();

    socket.on(
      "presence:update",
      ({ userId, online }) => {
        updateOnlineStatus(
          userId,
          online
        );
      }
    );

    return () => {
      socket.off("presence:update");
    };
  }, []);

  async function loadFriends() {
    try {
      const data = await getFriends();
      setFriends(data.friends);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSearch() {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      const data =
        await searchUsers(query);

      setResults(data.users);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSendRequest(
    userId: number
  ) {
    try {
      await sendFriendRequest(userId);
      alert("Solicitud enviada");
    } catch (err) {
      console.error(err);
      alert(
        "No se pudo enviar la solicitud"
      );
    }
  }

  async function handleRemoveFriend(
    friendId: number
  ) {
    try {
      await removeFriend(friendId);
      await loadFriends();
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el amigo");
    }
  }

  return (
    <MainLayout>
      <GlassPanel className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          Amigos
        </h2>

        <div className="mb-8 space-y-4">
          <Input
            placeholder="Buscar usuario..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
          />

          <Button onClick={handleSearch}>
            Buscar
          </Button>

          <div className="space-y-3">
            {results.map((user) => (
              <div
                key={user.id}
                className="
                  flex
                  justify-between
                  items-center
                  border-b
                  border-white/10
                  pb-2
                "
              >
                <div className="flex items-center gap-3">
                  <span>
                    {user.username}
                  </span>

                  <span>
                    {user.online
                      ? "🟢 CONECTADO"
                      : "⚫ DESCONECTADO"}
                  </span>
                </div>

                <Button
                  className="w-auto px-4 py-2"
                  onClick={() =>
                    handleSendRequest(
                      user.id
                    )
                  }
                >
                  Añadir
                </Button>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4">
          Lista de amigos
        </h3>

        <div className="space-y-3">
          {friends.length === 0 && (
            <p className="text-white/60">
              No tienes amigos todavía.
            </p>
          )}

          {friends.map((friend) => (
            <div
              key={friend.id}
              className="
                flex
                justify-between
                items-center
                border-b
                border-white/10
                pb-2
              "
            >
              <div className="flex gap-4 items-center">
                <span>
                  {friend.username}
                </span>

                <span>
                  {friend.online
                    ? "🟢 CONECTADO"
                    : "⚫ DESCONECTADO"}
                </span>
              </div>

              <Button
                className="w-auto px-4 py-2 bg-red-600"
                onClick={() =>
                  handleRemoveFriend(
                    friend.id
                  )
                }
              >
                Eliminar
              </Button>
            </div>
          ))}
        </div>
      </GlassPanel>
    </MainLayout>
  );
}