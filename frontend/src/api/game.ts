const API_URL = "http://localhost:3000";

function getToken() {
  return localStorage.getItem("token");
}

export async function createGame() {
  const res = await fetch(`${API_URL}/games`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
}

export async function getGame(gameId: string) {
  const res = await fetch(`${API_URL}/games/${gameId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
}

export async function joinGame(gameId: string) {
  const res = await fetch(`${API_URL}/games/${gameId}/join`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
}

export async function rollDice(gameId: string) {
  const res = await fetch(`${API_URL}/games/${gameId}/roll`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
}

export async function movePiece(
  gameId: string,
  pieceIndex: number
) {
  const res = await fetch(
    `${API_URL}/games/${gameId}/move`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ pieceIndex }),
    }
  );

  return res.json();
}