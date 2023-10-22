export interface UserAPIResponse {
  user: User;
}
export interface User {
  email: string;
  token: string;
  userName: string;
  password: string;
  image: string;
  description: string;
}
