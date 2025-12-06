import Constants from "expo-constants";

const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
console.log("ISDEV ? ", __DEV__);
export const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;

interface LoginResponse {
    user_id:string
}


const appleLogin = async (providerId:string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/apple/${providerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provider_id: providerId,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Failed to Sign UP");
    }
    const data: LoginResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Apple login error:", error.message);
    throw error;
  }
};

export default appleLogin;
