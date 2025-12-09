import Constants from "expo-constants";

const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;

export type User = {
  name: string;
  email: string;
};

interface PostResponse {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author: string;
  owner: User;
}

interface PostResponseList {
  datas: PostResponse[];
  count: number;
}

const getPostsKorea = async (token: string): Promise<PostResponseList> => {
  try {
    const response = await fetch(`${API_URL}/posts/korea/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseText = await response.text();
    if (response.status === 401) {
      throw new Error("Token Expired");
    }
    if (response.status === 404) {
      return { datas: [], count: 0 };
    }
    if (!response.ok) {
      let errMsg = "Failed to fetch posts in korea";
      try {
        const errData = JSON.parse(responseText);
        errMsg = errData.detail || errMsg;
      } catch {
        errMsg = responseText;
      }
      throw new Error(errMsg);
    }

    const data: PostResponseList = responseText
      ? JSON.parse(responseText)
      : { datas: [], count: 0 };
    return data;
  } catch (error: any) {
    console.error("Failed to fetch posts in korea:", error.message);
    throw error;
  }
};
export default getPostsKorea;
