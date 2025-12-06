import Constants from "expo-constants";

const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};

export const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;

interface SignInResponse {
  access_token: string;
  token_type: string;
  email: string;
  role: string;
  id: string;
}

const providerSignIn = async (
  provider: string,
  provider_id: string
): Promise<SignInResponse> => {
  try {
    const response = await fetch(`${API_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provider,
        provider_id,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Failed to Sign UP");
    }
    const data: SignInResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Sign UP error:", error.message);
    throw error;
  }
};

export default providerSignIn;
