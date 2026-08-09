export interface User {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}