import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { register } from "../api/api";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegisterPage() {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = async () => {
		const cleanUsername = username.trim();
		const cleanEmail = email.trim().toLowerCase();

		if (!cleanUsername || !cleanEmail || !password) {
			alert("Todos los campos son obligatorios");
			return;
		}

		if (cleanUsername.length < 3 || cleanUsername.length > 20) {
			alert("El nombre de usuario debe tener entre 3 y 20 caracteres");
			return;
		}

		if (!EMAIL_REGEX.test(cleanEmail)) {
			alert("Email inválido");
			return;
		}

		if (password.length < 8) {
			alert("La contraseña debe tener al menos 8 caracteres");
			return;
		}

		try {
			const data = await register(
				cleanUsername,
				cleanEmail,
				password
			);

			if (data.user)
				navigate("/");
			else
				alert(data.error || "Error en registro");
		}
		catch (err)
		{
			console.error(err);
			alert("Error de conexión");
		}
	};

	return (
		<AuthLayout>
			<div className="flex flex-col gap-4">
				<h1 className="text-3xl font-bold text-center text-pink-Primary">
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
						className="cursor-pointer text-pink-Primary"
					>
						Inicia sesión
					</span>
				</p>
			</div>
		</AuthLayout>
	);
}

export default RegisterPage;