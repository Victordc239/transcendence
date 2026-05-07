import type { ReactNode } from "react";
import GlassPanel from "../components/ui/GlassPanel";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-bgPrimary text-textPrimary transition-colors">
      <div className="mx-auto max-w-7xl p-6">
        <GlassPanel className="mb-6 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-title font-bold">
              🎮 Parchís Online
            </h1>

            <div className="text-small text-textSecondary">
              Lobby System
            </div>
          </div>
        </GlassPanel>

        {children}
      </div>
    </div>
  );
}