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

export default function GameBoard() {
  return (
    //<div className="relative aspect-square w-full max-w-[950px]">
    //<div className="relative aspect-square w-[90vmin] max-w-[900px]">
    <div className="relative aspect-square w-[90vmin] max-w-[900px] z-0">

      <img
        src="/board/board-base.svg"
        className="absolute inset-0 w-full h-full"
      />

      <img
        src="/board/board-glow.svg"
        className="
          absolute inset-0
          w-full h-full
          opacity-70
          mix-blend-screen
          pointer-events-none
        "
      />

      <img
        src="/board/board-overlay.svg"
        className="
          absolute inset-0
          w-full h-full
          pointer-events-none
        "
      />

    </div>
  );
}