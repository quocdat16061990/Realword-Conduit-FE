import { Profile } from './profile.model';

export interface ArticleAPIResponse {
  article: Article;
}
export interface ArticleAPIRequest {
  title: string;
  contentArticle: string;
  description: string;
  tags: string[];
}
export interface ArticlePagingAPIResponse {
  items: Article[];
  totalCount: number;
}
export interface ArticleFavouriteAPIRequest {
  slug: string;
}
export interface Article {
  slug: string;
  title: string;
  description: string;
  contentArticle: string;
  tags: string[];
  createAt: string;
  updateAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
export interface DeleteArticleAPIResponse {
  content: string;
}
