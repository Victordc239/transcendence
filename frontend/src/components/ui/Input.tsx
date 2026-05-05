interface InputProps {
  type?: string;
  placeholder?: string;
}

function Input({
  type = "text",
  placeholder,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full rounded-2xl
        border border-white/20
        bg-white/40
        px-4 py-3
        outline-none
        backdrop-blur-md
        placeholder:text-slate-500
        focus:ring-2
        focus:ring-pinkPrimary
      "
    />
  );
}

export default Input;