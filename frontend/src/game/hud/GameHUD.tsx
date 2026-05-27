import PlayersPanel from "./PlayersPanel";
import ChatPanel from "./ChatPanel";
import DicePanel from "./DicePanel";

export default function GameHUD({ game }: any) {
  return (
    <div className="
      fixed
      right-[20px]
      top-1/2
      -translate-y-1/2

      w-[290px]
      h-[62vh]

      flex
      flex-col
      gap-4

      z-50
    ">
      <PlayersPanel game={game} />

      <DicePanel game={game} />

      <ChatPanel game={game} />
    </div>
  );
}