import { CommentResponseList } from "@/types/comment/commentType";
import Constants from "expo-constants";

const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;

const getCommentsFrance = async (
  post_id: number,
  token: string
): Promise<CommentResponseList> => {
  try {
    const response = await fetch(`${API_URL}/comments/france/${post_id}`, {
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
      let errMsg = "Failed to fetch posts in france";
      try {
        const errData = JSON.parse(responseText);
        errMsg = errData.detail || errMsg;
      } catch {
        errMsg = responseText;
      }
      throw new Error(errMsg);
    }

    const data: CommentResponseList = responseText
      ? JSON.parse(responseText)
      : { datas: [], count: 0 };
    return data;
  } catch (error: any) {
    console.error("Failed to fetch posts in france:", error.message);
    throw error;
  }
};
export default getCommentsFrance;
