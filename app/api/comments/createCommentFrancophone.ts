import { PostResponse } from "@/types/post/PostType";
import Constants from "expo-constants";

const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;

const createCommentFrancophone = async (
  post_id: number,
  content: string,
  token: string
): Promise<PostResponse> => {
  try {
    const response = await fetch(`${API_URL}/comments/francophone/${post_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: content,
      }),
    });
    if (response.status === 401) {
      throw new Error("Token Expired");
    }
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Failed to Create Comment");
    }
    const data: PostResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Failed to create Comment in Francophone:", error.message);
    throw error;
  }
};

export default createCommentFrancophone;
