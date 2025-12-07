import { LoginResponse } from "@/types/auth/UserType";
import Constants from "expo-constants";

const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;

const googleUserFetch = async (providerId: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/users/google/${providerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Failed to LOGIN");
    }
    const data: LoginResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Google login error:", error.message);
    throw error;
  }
};

export default googleUserFetch;
