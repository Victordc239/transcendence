import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getMe,
  updateProfile,
} from "../api/user.api";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import GlassPanel from "../components/ui/GlassPanel";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  const [editing, setEditing] =
    useState(false);

  const [username, setUsername] =
    useState("");

  const [avatarUrl, setAvatarUrl] =
    useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getMe();

      setUser(data);

      setUsername(data.username);

      setAvatarUrl(
        data.avatar_url || ""
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSave() {
    try {
      await updateProfile(
        username,
        avatarUrl
      );

      await loadProfile();

      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  }

  if (!user) {
    return (
      <MainLayout>
        <div>Cargando...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <GlassPanel className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">
          Mi Perfil
        </h2>

        {editing ? (
          <>
            <Input
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
            />

            <Input
              value={avatarUrl}
              onChange={(e) =>
                setAvatarUrl(
                  e.target.value
                )
              }
            />

            <Button
              onClick={handleSave}
            >
              Guardar
            </Button>
          </>
        ) : (
          <>
            <p>
              <strong>
                Usuario:
              </strong>{" "}
              {user.username}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {user.email}
            </p>

            <p>
              <strong>
                Fecha alta:
              </strong>{" "}
              {new Date(
                user.created_at
              ).toLocaleDateString()}
            </p>

            <Button
              onClick={() =>
                setEditing(true)
              }
            >
              Editar Perfil
            </Button>
          </>
        )}
      </GlassPanel>
    </MainLayout>
  );
}