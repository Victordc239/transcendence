/*
    <div className="relative w-full h-full">

      <img
        src="/board/board-base.svg"
        className="absolute inset-0 w-full h-full object-contain"
      />
*/

/*
    <div className="absolute inset-0">
*/

/*export default function GameBoard() {
  return (
    <div className="relative w-full aspect-square max-w-[1100px]">

      <img src="/board/board-base.svg"
          className="absolute inset-0 w-full h-full" />

      <img src="/board/board-glow.svg"
          className="absolute inset-0 w-full h-full mix-blend-screen opacity-70 pointer-events-none" />

      <img src="/board/board-safe.svg"
          className="absolute inset-0 w-full h-full pointer-events-none" />

    </div>
    //<div className="relative aspect-square w-full max-w-[950px]">
    //<div className="relative aspect-square w-[90vmin] max-w-[900px]">
    /*<div className="relative aspect-square w-[95vmin] max-w-[1100px]">

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

    </div>*/
//  );
//}

/*export default function GameBoard({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="relative aspect-square w-[95vmin] max-w-[1100px]">

      <img
        src="/board/board-base.svg"
        className="absolute inset-0 w-full h-full select-none"
        draggable={false}
      />

      <img
        src="/board/board-safe.svg"
        className="
          absolute inset-0
          w-full h-full
          pointer-events-none
          opacity-90
        "
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

      <div className="absolute inset-0 z-20">
        {children}
      </div>

    </div>
  );
}*/

export default function GameBoard() {
  return (
    <div className="absolute inset-0">

      {/* BASE */}
      <img
        src="/board/board-base.svg"
        className="
          absolute inset-0
          w-full h-full
          object-contain
          select-none
          pointer-events-none
        "
      />

      {/* SAFE CELLS */}
      <img
        src="/board/board-safe.svg"
        className="
          absolute inset-0
          w-full h-full
          object-contain
          opacity-90
          mix-blend-screen
          pointer-events-none
        "
      />

      {/* GLOW */}
      <img
        src="/board/board-glow.svg"
        className="
          absolute inset-0
          w-full h-full
          object-contain
          opacity-90
          mix-blend-screen
          pointer-events-none
        "
      />

      <img
        src="/board/board-effects.svg"
        className="
          absolute inset-0
          w-full h-full
          object-contain
          opacity-90
          mix-blend-screen
          pointer-events-none
        "
      />

      <img
        src="/board/board-home-paths.svg"
        className="
          absolute inset-0
          w-full h-full
          object-contain
          opacity-50
          pointer-events-none
        "
      />

    </div>
  );
}