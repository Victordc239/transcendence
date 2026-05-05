import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={`
        w-full rounded-2xl
        border border-white/20
        bg-white/40
        px-4 py-3
        outline-none
        backdrop-blur-md
        placeholder:text-slate-500
        focus:ring-2
        focus:ring-pinkPrimary
        transition
        ${className}
      `}
    />
  );
}

export default Input;