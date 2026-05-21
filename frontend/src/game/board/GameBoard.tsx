/*export default function GameBoard() {
  const size = useBoardSize();

  return (
    <div className="game-container">
      <svg width={size} height={size} viewBox="0 0 1 1">
        <BoardBackground />
        <BoardGrid />
        <SafeZones />
        <GoalZone />
        <GamePieces />
      </svg>

      <GameHUD />
    </div>
  );
}*/

/*export default function GameBoard() {
  return (
    <div className="relative w-full h-full">

      <img
        src="/board/board-base.svg"
        className="absolute inset-0 w-full h-full object-contain"
      />

      <img
        src="/board/board-glow.svg"
        className="
          absolute inset-0
          w-full h-full
          object-contain
          pointer-events-none
          mix-blend-screen
          opacity-80
        "
      />

    </div>
  );
}*/

/*export default function GameBoard() {
  return (
    <div className="absolute inset-0">

      <img
        src="/board/board-base.svg"
        className="
          absolute inset-0
          w-full h-full
          object-contain
        "
      />

      <img
        src="/board/board-glow.svg"
        className="
          absolute inset-0
          w-full h-full
          object-contain
          pointer-events-none
          mix-blend-screen
          opacity-90
        "
      />
    </div>
  );
}*/