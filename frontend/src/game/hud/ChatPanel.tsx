import { useState } from "react";
import { socket } from "../../socket/socket";

export default function ChatPanel({ game }: any) {
  const [msg, setMsg] = useState("");

  const send = () => {
    socket.emit("chat:send", {
      gameId: game.id,
      message: msg,
    });

    setMsg("");
  };

  return (
    <div className="p-3 rounded-xl bg-white/5 flex flex-col gap-2">
      <div className="text-xs opacity-70">Chat</div>

      <input
        className="bg-black/30 p-2 rounded"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />

      <button onClick={send} className="bg-purple-500 rounded p-1">
        Send
      </button>
    </div>
  );
}