import { Profile } from './profile.model';

export interface ArticleAPIResponse {
  article: Article;
}
export interface ArticlePagingAPIResponse {
  items: Article[];
  totalCount: number;
}
export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tags: string[];
  createAt: string;
  updateAt: string;
  favorited: boolean;
  favouritesCount: number;
  author: Profile;
}
