import { useEffect, useState } from "react";
import { socket } from "../../socket/socket";

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
  const [messages, setMessages] = useState<LobbyMessage[]>([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    socket.emit("lobby:getHistory");

    const onHistory = (history: LobbyMessage[]) => {
      setMessages(history);
    };

    const onMessage = (msg: LobbyMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    const onTyping = () => {
      setTyping(true);

      setTimeout(() => {
        setTyping(false);
      }, 1000);
    };

    socket.on("lobby:history", onHistory);
    socket.on("lobby:message", onMessage);
    socket.on("lobby:typing", onTyping);

    return () => {
      socket.off("lobby:history", onHistory);
      socket.off("lobby:message", onMessage);
      socket.off("lobby:typing", onTyping);
    };
  }, []);

  const send = () => {
    if (!message.trim()) return;

    socket.emit("lobby:send", {
      message,
    });

    setMessage("");
  };

  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-bold mb-4">Lobby Chat</h2>

      <div className="h-96 overflow-y-auto rounded-xl bg-black/20 p-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id}>
            <span className="font-bold text-purple-300">
              {m.user.username}
            </span>

            <span className="mx-2 text-white/50">:</span>

            <span>{m.message}</span>
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
            if (e.key === "Enter") {
              send();
            }
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