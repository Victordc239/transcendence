import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { login, getMe } from "../api/api";
import { useAuth } from "../context/AuthContext";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
	const navigate = useNavigate();
	const auth = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		const cleanEmail = email.trim().toLowerCase();

		if (!cleanEmail || !password) {
			alert("Todos los campos son obligatorios");
			return;
		}

		if (!EMAIL_REGEX.test(cleanEmail)) {
			alert("Email inválido");
			return;
		}

		try {
			const data = await login(cleanEmail, password);
			if (!data.success)
			{
				alert(data.error);
				return;
			}

			const user = await getMe(data.token);

			auth.login(data.token, user);

			navigate("/lobby");
		}
		catch (err)
		{
			alert("Error de conexión");
		}
	};

	return (
		<AuthLayout>
			<div className="flex flex-col gap-6">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-pink-Primary">
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
						className="cursor-pointer text-pink-Primary"
					>
						Regístrate
					</span>
				</p>
			</div>
		</AuthLayout>
	);
}

export default LoginPage;