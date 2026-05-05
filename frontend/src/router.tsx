import { createBrowserRouter } from "react-router-dom";

import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";

import ProtectedRoute from "./auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/lobby",
    element: (
      <ProtectedRoute>
        <LobbyPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/game",
    element: (
      <ProtectedRoute>
        <GamePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/history",
    element: (
      <ProtectedRoute>
        <HistoryPage />
      </ProtectedRoute>
    ),
  },
]);