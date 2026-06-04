/*import { useState } from "react";
import { socket } from "../../socket/socket";

export default function ChatPanel({ game }: any) {
  const [msg, setMsg] = useState("");

  const send = () => {
    if (!msg.trim()) return;

    socket.emit("chat:send", {
      gameId: game.id,
      message: msg,
    });

    setMsg("");
  };

  return (
    <div className="glass-panel rounded-3xl p-4 flex-1 flex flex-col gap-3">
      <div className="font-semibold text-white/80">
        Chat
      </div>

      <div className="flex-1 rounded-2xl bg-black/20 border border-white/5"
      />

      <div className="flex gap-2 items-center">
        <input
          className="flex-1 min-w-0 rounded-xl bg-black/30 border border-white/10 p-3 outline-none"
        />

        <button onClick={send} 
          className="shrink-0 px-4 rounded-xl bg-purple-500 border border-cyan-400/30"
        >
          Send
        </button>
      </div>
    </div>
  );
}*/

import { useEffect, useState } from "react";
import { socket } from "../../socket/socket";

type ChatMessage = {
  userId: number;
  color: string;
  message: string;
  timestamp: number;
};

export default function ChatPanel({
  game,
}: any) {
  const [msg, setMsg] =
    useState("");

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  useEffect(() => {
    const onMessage = (
      data: ChatMessage
    ) => {
      setMessages((prev) => [
        ...prev,
        data,
      ]);
    };

    socket.on(
      "chat:message",
      onMessage
    );

    return () => {
      socket.off(
        "chat:message",
        onMessage
      );
    };
  }, []);

  const send = () => {
    if (!msg.trim()) return;

    socket.emit("chat:send", {
      gameId: game.id,
      message: msg,
    });

    setMsg("");
  };

  return (
    <div className="glass-panel rounded-3xl p-4 flex-1 flex flex-col gap-3 min-h-0">
      <div className="font-semibold text-white/80">
        Chat
      </div>

      <div
        className="
          flex-1
          overflow-y-auto
          rounded-2xl
          bg-black/20
          border
          border-white/5
          p-3
          space-y-2
        "
      >
        {messages.map(
          (m, index) => (
            <div
              key={index}
              className="
                text-sm
                break-words
              "
            >
              <span
                className="
                  font-semibold
                  text-cyan-400
                "
              >
                {m.color}
              </span>

              <span className="mx-2">
                :
              </span>

              <span>
                {m.message}
              </span>
            </div>
          )
        )}
      </div>

      <div className="flex gap-2 items-center">
        <input
          value={msg}
          onChange={(e) =>
            setMsg(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter"
            ) {
              send();
            }
          }}
          className="
            flex-1
            min-w-0
            rounded-xl
            bg-black/30
            border
            border-white/10
            p-3
            outline-none
          "
          placeholder="Write a message..."
        />

        <button
          onClick={send}
          className="
            shrink-0
            px-4
            py-3
            rounded-xl
            bg-purple-500
            border
            border-cyan-400/30
          "
        >
          Send
        </button>
      </div>
    </div>
  );
}