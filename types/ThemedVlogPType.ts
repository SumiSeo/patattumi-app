export type Vlog = {
  id: number;
  type: string;
  course: string;
  title: string;
  description: string;
  articles: string;
  insta?: string;
  youtube?: string;
  tiktok: string;
};

export type ThemedVlogProps = {
  data: Vlog | undefined;
};
