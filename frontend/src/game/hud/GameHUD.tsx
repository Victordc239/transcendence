/*import DicePanel from "./DicePanel";
import PlayersPanel from "./PlayersPanel";

export default function GameHUD({ game, onRoll }: any) {
  return (
    <div className="absolute right-4 top-4 w-64 space-y-4">
      <DicePanel value={game.dice} onRoll={onRoll} />

      <PlayersPanel
        players={game.players}
        currentTurn={game.turn}
      />
    </div>
  );
}*/

/*import PlayersPanel from "./PlayersPanel";
import ChatPanel from "./ChatPanel";
import DicePanel from "./DicePanel";

export default function GameHUD({ game }: any) {
  return (
    <div className="absolute top-0 right-[-320px] w-[300px] h-[600px] flex flex-col gap-3">
      <PlayersPanel game={game} />
      <DicePanel game={game} />
      <ChatPanel game={game} />
    </div>
  );
}*/

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