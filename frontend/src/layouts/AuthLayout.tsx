import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="
      flex min-h-screen items-center justify-center
      bg-gradient-to-br
      from-pink-100
      via-purple-100
      to-blue-100
      p-6
    ">
      <div
        className="
          w-full max-w-md
          rounded-[32px]
          border border-white/20
          bg-white/30
          p-8
          shadow-glass
          backdrop-blur-xl
        "
      >
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;