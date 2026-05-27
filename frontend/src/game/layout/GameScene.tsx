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

