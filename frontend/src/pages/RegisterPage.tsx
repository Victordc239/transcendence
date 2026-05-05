import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { register } from "../api/api";

function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const data = await register(username, email, password);

      if (data.user) {
        navigate("/");
      } else {
        alert(data.error || "Error en registro");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center text-pinkPrimary">
          Crear cuenta
        </h1>

        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleRegister}>
          Registrarse
        </Button>

        <p className="text-center text-sm">
          ¿Ya tienes cuenta?{" "}
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer text-pinkPrimary"
          >
            Inicia sesión
          </span>
        </p>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;