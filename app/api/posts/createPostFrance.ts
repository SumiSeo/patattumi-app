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

const createPost = async (
  title: string,
  content: string,
  token: string
): Promise<PostResponse> => {
  try {
    const response = await fetch(`${API_URL}/posts/france`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Failed to Sign UP");
    }
    const data: PostResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Sign UP error:", error.message);
    throw error;
  }
};

export default createPost;
