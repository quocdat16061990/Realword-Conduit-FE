import { Profile } from './profile.model';

export interface CommentAPIResponse {
  comments: Comment[];
}
export interface CommentListAPIResponse {
  comments: Comment[];
}
export interface Comment {
  id: string;
  createAt: string;
  updateAt: string;
  body: string;
  author: Profile;
}
