import { useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import { useAuth } from "../../context/AuthContext";

type LobbyMessage = {
  id: number;
  message: string;
  created_at: string;
  user: {
    id: number;
    username: string;
    avatar_url?: string;
  };
};

export default function LobbyChat() {
  const { user } = useAuth();

  const [messages, setMessages] = useState<LobbyMessage[]>([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<number[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    socket.emit("lobby:getHistory");

    const onHistory = (history: LobbyMessage[]) => {
      setMessages(history);
    };

    const onMessage = (msg: LobbyMessage) => {
      setMessages((prev) => {
        if (blockedUsers.includes(msg.user.id)) return prev;
        return [...prev, msg];
      });
    };

    const onTyping = () => {
      setTyping(true);
      setTimeout(() => setTyping(false), 1000);
    };

    const onBlocked = ({ blockedUserId }: { blockedUserId: number }) => {
      setBlockedUsers((prev) => [...prev, blockedUserId]);

      setMessages((prev) =>
        prev.filter((m) => m.user.id !== blockedUserId)
      );
    };

    const onInvite = (invite: any) => {
      if (!user) return;
      if (invite.targetUserId !== user.id) return;

      alert(`${invite.from} invited you to play!`);
    };

    socket.on("lobby:history", onHistory);
    socket.on("lobby:message", onMessage);
    socket.on("lobby:typing", onTyping);
    socket.on("lobby:userBlocked", onBlocked);
    socket.on("lobby:invite", onInvite);

    return () => {
      socket.off("lobby:history", onHistory);
      socket.off("lobby:message", onMessage);
      socket.off("lobby:typing", onTyping);
      socket.off("lobby:userBlocked", onBlocked);
      socket.off("lobby:invite", onInvite);
    };
  }, [blockedUsers, user]);

  const send = () => {
    if (!message.trim()) return;

    socket.emit("lobby:send", { message });
    setMessage("");
  };

  const blockUser = (userId: number) => {
    socket.emit("lobby:blockUser", {
      blockedUserId: userId,
    });
    setSelectedUserId(null);
  };

  const inviteUser = (userId: number) => {
    socket.emit("lobby:invite", {
      targetUserId: userId,
    });
    setSelectedUserId(null);
  };

  const viewProfile = (userId: number) => {
    window.location.href = `/profile/${userId}`;
  };

  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-bold mb-4">Lobby Chat</h2>

      <div className="h-96 overflow-y-auto rounded-xl bg-black/20 p-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="relative">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setSelectedUserId(
                    selectedUserId === m.user.id ? null : m.user.id
                  )
                }
                className="font-bold text-purple-300"
              >
                {m.user.username}
              </button>

              <span className="text-white/50">:</span>
              <span>{m.message}</span>
            </div>

            {selectedUserId === m.user.id && (
              <div className="mt-2 ml-4 bg-black rounded p-2 flex gap-2">
                <button
                  onClick={() => viewProfile(m.user.id)}
                  className="bg-blue-500 px-2 py-1 rounded text-xs"
                >
                  Profile
                </button>

                <button
                  onClick={() => inviteUser(m.user.id)}
                  className="bg-green-500 px-2 py-1 rounded text-xs"
                >
                  Invite
                </button>

                <button
                  onClick={() => blockUser(m.user.id)}
                  className="bg-red-500 px-2 py-1 rounded text-xs"
                >
                  Block
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {typing && (
        <p className="text-xs text-white/50 mt-2">
          Someone is typing...
        </p>
      )}

      <div className="mt-4 flex gap-3">
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            socket.emit("lobby:typing");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          className="flex-1 rounded-xl bg-white/10 px-4 py-3"
          placeholder="Write a message..."
        />

        <button
          onClick={send}
          className="rounded-xl bg-purple-500 px-6 py-3"
        >
          Send
        </button>
      </div>
    </div>
  );
}