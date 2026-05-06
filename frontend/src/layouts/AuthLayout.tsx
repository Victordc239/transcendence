import type { ReactNode } from "react";

import ThemeToggle from "../components/ui/ThemeToggle";

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div
      className="
        relative
        flex min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-br
        from-bgPrimary
        via-bgSecondary
        to-bgPrimary
        p-6
      "
    >
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div
        className="
          glass-panel
          relative
          w-full
          max-w-md
          rounded-glass
          p-8
          shadow-glass
        "
      >
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;