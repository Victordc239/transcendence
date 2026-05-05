interface ButtonProps {
  children: React.ReactNode;
}

function Button({ children }: ButtonProps) {
  return (
    <button
      className="
        w-full rounded-2xl
        bg-pinkPrimary
        px-4 py-3
        text-white
        font-semibold
        transition-all
        duration-200
        hover:scale-[1.02]
        hover:opacity-90
        active:scale-[0.98]
      "
    >
      {children}
    </button>
  );
}

export default Button;