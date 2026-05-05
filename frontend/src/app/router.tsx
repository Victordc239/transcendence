import {
  createBrowserRouter,
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import LobbyPage from "../pages/LobbyPage";
import GamePage from "../pages/GamePage";
import ProfilePage from "../pages/ProfilePage";
import HistoryPage from "../pages/HistoryPage";

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
    element: <LobbyPage />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
]);