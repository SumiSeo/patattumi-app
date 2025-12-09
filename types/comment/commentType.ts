export type User = {
  name: string;
  email: string;
};

export interface CommentResponse {
  content: string;
  created_at: string;
  author: string;
  owner: User;
  id: number;
}

export interface CommentResponseList {
  datas: CommentResponse[];
  count: number;
}