export type User = {
  name: string;
  email: string;
};
export interface PostResponse {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author: string;
  owner: User;
}

export interface PostResponseList {
  datas: PostResponse[];
  count: number;
}