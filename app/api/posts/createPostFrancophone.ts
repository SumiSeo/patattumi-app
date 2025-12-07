import { PostResponse } from "@/types/post/PostType";

import Constants from "expo-constants";
const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;

const createPostFrancophone = async (
  title: string,
  content: string,
  token: string
): Promise<PostResponse> => {
  try {
    const response = await fetch(`${API_URL}/posts/francophone/`, {
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
      throw new Error(errData.detail || "Failed to Create Post");
    }
    const data: PostResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Failed to create Post in Francophone:", error.message);
    throw error;
  }
};

export default createPostFrancophone;
