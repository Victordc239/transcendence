import AuthLayout from "../layouts/AuthLayout";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function LoginPage() {
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
          />

          <Input
            type="password"
            placeholder="Password"
          />
        </div>

        <Button>
          Iniciar sesión
        </Button>

        <div className="flex flex-col gap-3">
          <Button>
            Continuar con Google
          </Button>

          <Button>
            Continuar con 42
          </Button>

          <Button>
            Continuar con GitHub
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;