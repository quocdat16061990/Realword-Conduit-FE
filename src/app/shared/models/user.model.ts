export interface User {
  email: string;
  accessToken: string;
  username: string;
  password: string;
  image: string;
  description: string;
  isFollowed: boolean;
}
export interface UpdateBodyRequest {
  email: string;
  username: string;
  image: string;
  description: string;
}
