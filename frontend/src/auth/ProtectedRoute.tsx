import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

export default function ProtectedRoute({ children }: any) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
}