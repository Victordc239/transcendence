import type { ReactNode } from "react";

import ThemeToggle from "../components/ui/ThemeToggle";
import LanguageSwitcher from "../i18n/LanguageSwitcher";
import Footer from "../components/ui/Footer";

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
        flex
        min-h-screen
        flex-col
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
      {/* Controles superiores */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <LanguageSwitcher />
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

      <div className="w-full max-w-4xl">
        <Footer />
      </div>
    </div>
  );
}

export default AuthLayout;