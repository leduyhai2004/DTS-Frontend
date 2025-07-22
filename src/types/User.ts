export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  status: string;
  role: {
    id: number;
    name: string;
  };
  userAvatar: string;
  userAvatarUrl: string; // URL to fetch the avatar image
  createdAt: number[];
  updatedAt: number[];
}

export interface PagedResponse {
  content: User[];
  totalPages: number;
  totalElements: number;
  number: number; // current page
  size: number;   // page size
}
