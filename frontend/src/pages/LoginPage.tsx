import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { login, getMe } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
	const navigate = useNavigate();
	const auth = useAuth();
	const { t } = useTranslation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		const cleanEmail = email.trim().toLowerCase();

		if (!cleanEmail || !password) {
			alert(t("validation.requiredFields"));
			return;
		}

		if (!EMAIL_REGEX.test(cleanEmail)) {
			alert(t("validation.invalidEmail"));
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
			alert(t("errors.connection"));
		}
	};

	return (
		<AuthLayout>
			<div className="flex flex-col gap-6">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-pink-Primary">
						{t("app.title")}
					</h1>

					<p className="mt-2 text-slate-600">
						{t("login.welcome")}
					</p>
				</div>

				<div className="flex flex-col gap-4">
					<Input
						type="email"
						placeholder={t("login.email")}
						value={email}
						onChange={(e: any) => setEmail(e.target.value)}
					/>

					<Input
						type="password"
						placeholder={t("login.password")}
						value={password}
						onChange={(e: any) => setPassword(e.target.value)}
					/>
				</div>

				<Button onClick={handleLogin}>
					{t("login.signIn")}
				</Button>

				<p className="text-center text-sm">
					{t("login.noAccount")}{" "}
					<span
						onClick={() => navigate("/register")}
						className="cursor-pointer text-pink-Primary"
					>
						{t("login.signUp")}
					</span>
				</p>
			</div>
		</AuthLayout>
	);
}

export default LoginPage;