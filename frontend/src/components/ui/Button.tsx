import type { ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        w-full rounded-2xl
        bg-gradient-to-r
        from-pinkPrimary
        to-purplePrimary
        px-4 py-3
        font-semibold
        text-white
        shadow-glass
        transition-all
        hover:scale-[1.02]
        hover:opacity-90
        active:scale-[0.98]
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;