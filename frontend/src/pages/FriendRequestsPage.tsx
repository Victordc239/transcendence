import { useEffect, useState} from "react";
import MainLayout from "../layouts/MainLayout";
import GlassPanel from "../components/ui/GlassPanel";
import Button from "../components/ui/Button";
import type { FriendRequest } from "../types/friend";
import { getPendingRequests, acceptFriendRequest} from "../api/friends.api";

export default function FriendRequestsPage() {
  const [requests, setRequests] =
    useState<FriendRequest[]>([]);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    try {
      const data = await getPendingRequests();

      setRequests(data.requests);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAccept(
    id: number
  ) {
    await acceptFriendRequest(id);

    loadRequests();
  }

  return (
    <MainLayout>
      <GlassPanel className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          Solicitudes
        </h2>

        <div className="space-y-4">
          {requests.map(
            (request) => (
              <div
                key={request.senderId}
                className="
                  flex
                  justify-between
                  items-center
                "
              >
                <span>
                  {
                    request.senderUsername
                  }
                </span>

                <Button
                  className="w-auto px-4"
                  onClick={() =>
                    handleAccept(
                      request.senderId
                    )
                  }
                >
                  Aceptar
                </Button>
              </div>
            )
          )}
        </div>
      </GlassPanel>
    </MainLayout>
  );
}