import { http } from "./http";
import type { User } from "../types/user";

export function getMe() {
  return http<User>("/users/me");
}

export function updateProfile(
  username: string,
  avatar_url: string
) {
  return http<User>("/users/me", {
    method: "PUT",
    body: JSON.stringify({
      username,
      avatar_url,
    }),
  });
}
