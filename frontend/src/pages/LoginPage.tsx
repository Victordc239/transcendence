import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { login } from "../api/api";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/lobby");
      } else {
        alert(data.error || "Error en login");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pinkPrimary">
            Parchís Online
          </h1>

          <p className="mt-2 text-slate-600">
            Bienvenido de nuevo
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>

        <Button onClick={handleLogin}>
          Iniciar sesión
        </Button>

        <p className="text-center text-sm">
          ¿No tienes cuenta?{" "}
          <span
            onClick={() => navigate("/register")}
            className="cursor-pointer text-pinkPrimary"
          >
            Regístrate
          </span>
        </p>
        
        <div className="flex flex-col gap-3">
          <Button className="bg-white/40 text-slate-700">
            Continuar con Google
          </Button>

          <Button className="bg-white/40 text-slate-700">
            Continuar con 42
          </Button>

          <Button className="bg-white/40 text-slate-700">
            Continuar con GitHub
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;