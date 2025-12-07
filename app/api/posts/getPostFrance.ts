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

const getPost = async (
  token: string,
  id:number,
): Promise<PostResponse> => {
  try {
    const response = await fetch(`${API_URL}/posts/france/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseText = await response.text();

    if (!response.ok) {
      let errMsg = "Failed to fetch posts in france";
      try {
        const errData = JSON.parse(responseText);
        errMsg = errData.detail || errMsg;
      } catch {
        errMsg = responseText;
      }
      throw new Error(errMsg);
    }
    const data: PostResponse = JSON.parse(responseText);
    return data;
  } catch (error: any) {
    console.error("Sign UP error:", error.message);
    throw error;
  }
};

export default getPost;
