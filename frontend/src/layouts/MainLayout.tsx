import type { ReactNode } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import GlassPanel from "../components/ui/GlassPanel";
import Footer from "../components/ui/Footer";

import { useAuth } from "../context/AuthContext";

interface Props {
  children: ReactNode;
}

export default function MainLayout({
  children,
}: Props) {
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-bgPrimary text-textPrimary flex flex-col">
      <div className="mx-auto w-full max-w-7xl flex-1 p-6">
        <GlassPanel className="mb-6 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-title font-bold">
              🎮 Parchís Online
            </h1>

            <div className="flex gap-4">
              <Link to="/lobby">
                Lobby
              </Link>

              <Link to={`/profile/${user?.id}`}>
                Perfil
              </Link>

              <Link to="/friends">
                Amigos
              </Link>

              <Link to="/friend-requests">
                Solicitudes
              </Link>

              <button onClick={handleLogout}>
                Salir
              </button>
            </div>
          </div>
        </GlassPanel>

        {children}

        <Footer />
      </div>
    </div>
  );
}