import { createCanvas } from "canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* ============================ */

const SIZE = 512;

const COLORS = {
  pink:   { base: "#ff4fd8", shadow: "#8b1b6b", highlight: "#ffb3f2" },
  purple: { base: "#8b5cff", shadow: "#3b1b7a", highlight: "#c7b3ff" },
  blue:   { base: "#3aa8ff", shadow: "#0b3b66", highlight: "#b8e6ff" },
  green:  { base: "#2ee59d", shadow: "#0f6b45", highlight: "#bfffe6" },
};

/* FIX IMPORTANT: __dirname no existe en ESM */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ============================ */

function drawPiece(ctx, colorSet) {
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const radius = 170;

  const grad = ctx.createRadialGradient(cx - 60, cy - 80, 40, cx, cy, radius);
  grad.addColorStop(0, colorSet.highlight);
  grad.addColorStop(0.4, colorSet.base);
  grad.addColorStop(1, colorSet.shadow);

  ctx.beginPath();
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.ellipse(cx + 20, cy + 40, radius * 0.9, radius * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = grad;
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  const rim = ctx.createRadialGradient(cx - 120, cy - 140, 10, cx, cy, radius);
  rim.addColorStop(0, "rgba(255,255,255,0.9)");
  rim.addColorStop(0.2, "rgba(255,255,255,0.25)");
  rim.addColorStop(1, "rgba(255,255,255,0)");

  ctx.beginPath();
  ctx.fillStyle = rim;
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
}

/* ============================ */

function exportPiece(name, colorSet) {
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, SIZE, SIZE);
  drawPiece(ctx, colorSet);

  const buffer = canvas.toBuffer("image/png");

  fs.writeFileSync(
    path.join(__dirname, `${name}-piece.png`),
    buffer
  );

  console.log(`Generated ${name}-piece.png`);
}

/* ============================ */

exportPiece("pink", COLORS.pink);
exportPiece("purple", COLORS.purple);
exportPiece("blue", COLORS.blue);
exportPiece("green", COLORS.green);