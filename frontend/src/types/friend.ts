export interface Friend {
  id: number;
  username: string;
  avatar_url?: string;
  online?: boolean;
}

export interface FriendRequest {
  id: number;
  senderId: number;
  senderUsername: string;
}

export interface FriendsResponse {
  friends: Friend[];
}

export interface FriendRequestsResponse {
  requests: FriendRequest[];
}