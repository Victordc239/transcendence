//import GameBoard from "../board/GameBoard";
//import GamePieces from "../pieces/GamePieces";
//import GameHUD from "../hud/GameHUD";
//import BoardEffects from "../board/BoardEffects";

/*export default function GameScene({ game }: any) {
  return (
      <div className="relative w-full h-full min-h-screen overflow-hidden">

        <div className="absolute inset-0 flex items-center justify-center">
          <GameBoard />
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
}*/


/*export default function GameScene({ game }: any) {
  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden flex items-center justify-center">

      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,rgba(59,130,246,.12),transparent_60%)]
        "
      />

      <GameBoard>

        <BoardEffects />

        <GamePieces game={game} />

      </GameBoard>

      <GameHUD game={game} />

    </div>
  );
}*/

import GameBoard from "../board/GameBoard";
import GamePieces from "../pieces/GamePieces";
import GameHUD from "../hud/GameHUD";
import BoardEffects from "../board/BoardEffects";

export default function GameScene({ game }: any) {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* BACKGROUND FX */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,rgba(59,130,246,.12),transparent_60%)]
        "
      />

      {/* BOARD WRAPPER */}
      <div
        className="
          absolute inset-0
          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            relative
            aspect-square
            w-[92vmin]
            max-w-[1100px]
          "
        >
          {/* BOARD */}
          <GameBoard />

          {/* FX */}
          <BoardEffects />

          {/* PIECES */}
          <GamePieces game={game} />
        </div>
      </div>

      {/* HUD */}
      <GameHUD game={game} />
    </div>
  );
}

