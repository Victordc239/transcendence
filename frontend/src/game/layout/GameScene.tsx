//import { useMemo } from "react";
import ParchisBoard from "../../components/game/ParchisBoard";
import GamePieces from "../pieces/GamePieces";
import GameHUD from "../hud/GameHUD";

export default function GameScene({ game }: any) {
  return (
    <div className="relative w-[600px] h-[600px] mx-auto">
      
      {/* BOARD LAYER */}
      <div className="absolute inset-0">
        <ParchisBoard />
      </div>

      {/* PIECES LAYER */}
      <div className="absolute inset-0">
        <GamePieces game={game} />
      </div>

      {/* HUD LAYER (UI OVERLAY) */}
      <GameHUD game={game} />
    </div>
  );
}