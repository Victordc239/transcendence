import DicePanel from "./DicePanel";
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
}