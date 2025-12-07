import Constants from "expo-constants";

const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;

type User = {
  name: string;
  email: string;
};
interface PostResponse {
  title: string;
  content: string;
  created_at: string;
  owner: User;
}

const getPosts = async (
  token: string,
): Promise<PostResponse> => {
  try {
    const response = await fetch(`${API_URL}/posts/france/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Failed to Fetch posts in france");
    }
    const data: PostResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Faile to fetch posts in france:", error.message);
    throw error;
  }
};

export default getPosts;