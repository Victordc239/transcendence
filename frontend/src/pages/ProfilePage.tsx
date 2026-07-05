import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getMe,
  getUserById,
  updateProfile,
} from "../api/user.api";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import GlassPanel from "../components/ui/GlassPanel";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  const [editing, setEditing] =
    useState(false);

  const [username, setUsername] =
    useState("");

  const avatars = [
    "/uploads/default-avatar.png",
    "/uploads/default-avatar1.png",
    "/uploads/default-avatar2.png",
    "/uploads/default-avatar3.png",
    "/uploads/default-avatar4.png",
    "/uploads/default-avatar5.png",
    "/uploads/default-avatar6.png",
    "/uploads/default-avatar7.png",
    "/uploads/default-avatar8.png",
    "/uploads/default-avatar9.png",
  ];
  const { id } = useParams();
  const { user: me } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const isMyProfile = Number(id) === me?.id;

  useEffect(() => {
    loadProfile();
  }, [id, me]);

  async function loadProfile() {
    try {
      let data;
      if (isMyProfile)
          data = await getMe();
      else
          data = await getUserById(id!);

      setSelectedAvatar(data.avatar_url || "/uploads/default-avatar.png");

      setUser(data);

      setUsername(data.username);

    } catch (err) {
      console.error(err);
    }
  }

  async function handleSave() {
    try {
      if (!isMyProfile)
        return;
      await updateProfile(
        username,
        selectedAvatar
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
          {isMyProfile
          ? "Mi Perfil"
          : `Perfil de ${user.username}`}
        </h2>

        {editing && isMyProfile ? (
          <>
            <div className="grid grid-cols-5 gap-3 my-4">
              {avatars.map((avatar) => (
                <img
                  key={avatar}
                  src={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`
                    w-16 h-16 rounded-full cursor-pointer border-2 object-cover
                    ${selectedAvatar === avatar
                      ? "border-cyan-400 shadow-lg"
                      : "border-white/10"
                    }
                  `}
                />
              ))}
            </div>

            <Input
              value={username}
              onChange={(e) =>
                setUsername(
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
            <div className="flex justify-center mb-6">
              <img
                src={selectedAvatar || "/uploads/default-avatar.png"}
                className="w-24 h-24 rounded-full object-cover border border-white/20"
                alt="avatar"
              />
            </div>

            <p>
              <strong>
                Usuario:
              </strong>{" "}
              {user.username}
            </p>

            {isMyProfile && (
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
            )}

            <p>
              <strong>
                Fecha alta:
              </strong>{" "}
              {new Date(
                user.created_at
              ).toLocaleDateString()}
            </p>

            {isMyProfile && (
                <Button
                    onClick={() => setEditing(true)}
                >
                    Editar Perfil
                </Button>
            )}
          </>
        )}
      </GlassPanel>
    </MainLayout>
  );
}