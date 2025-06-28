export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  status: string;
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
