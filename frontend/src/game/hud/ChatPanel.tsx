import { useState } from "react";
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
}
