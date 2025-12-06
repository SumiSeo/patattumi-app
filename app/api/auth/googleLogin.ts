import Constants from "expo-constants";

const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
console.log("ISDEV ? ", __DEV__);
export const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;

interface LoginResponse {
    user_id:string
}

type LoginProps = {
  provider_id: string;
};

const googleLogin = async ({
  provider_id,
}: LoginProps): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/google/${provider_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provider_id,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Failed to Sign UP");
    }
    const data: LoginResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Google login error:", error.message);
    throw error;
  }
};

export default googleLogin;
