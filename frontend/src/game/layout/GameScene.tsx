//import { useMemo } from "react";
/*import ParchisBoard from "../../components/game/ParchisBoard";
import GamePieces from "../pieces/GamePieces";
import GameHUD from "../hud/GameHUD";

export default function GameScene({ game }: any) {
  return (
    <div className="relative w-[600px] h-[600px] mx-auto">
      
      <div className="absolute inset-0">
        <ParchisBoard />
      </div>

      <div className="absolute inset-0">
        <GamePieces game={game} />
      </div>

      <GameHUD game={game} />
    </div>
  );
}*/

import ParchisBoard from "../../components/game/ParchisBoard";
//import GameBoard from "../board/GameBoard";
import GamePieces from "../pieces/GamePieces";
import GameHUD from "../hud/GameHUD";
import BoardEffects from "../board/BoardEffects";

export default function GameScene({ game }: any) {
  return (
      <div className="game-scene">

              <div className="absolute inset-0">
          <ParchisBoard />
        </div>

      <div className="
        absolute inset-0
        bg-[radial-gradient(circle_at_center,rgba(59,130,246,.12),transparent_60%)]
      " />

      <div className="board-container">

        <BoardEffects />

        <div className="absolute inset-0 z-20">
          <GamePieces game={game} />
        </div>
      </div>

      <GameHUD game={game} />
    </div>
  );
}
