import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
      <p className="mb-3">
        © {new Date().getFullYear()} Parchís Online · Academic project developed at
        42 Madrid.
      </p>

      <div className="flex justify-center gap-6">
        <Link
          to="/privacy"
          className="hover:text-pink-400 transition-colors"
        >
          Privacy Policy
        </Link>

        <Link
          to="/terms"
          className="hover:text-pink-400 transition-colors"
        >
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}