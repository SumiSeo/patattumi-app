import Constants from "expo-constants";

const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
console.log("ISDEV ? ", __DEV__);
export const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;

interface RegisterResponse {
  access_token: string;
  token_type: string;
  email: string;
  role: string;
}

type RegisterProps = {
  email: string;
  name: string;
  provider: string;
  provider_id: string;
};

// Google 로그인 후 서버에 토큰 보내고 JWT 받기
const register = async ({
  email,
  name,
  provider,
  provider_id,
}: RegisterProps): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        provider,
        provider_id,
        age: "",
        korean_name: "",
        totem: "",
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Failed to Sign UP");
    }
    const data: RegisterResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Google login error:", error.message);
    throw error;
  }
};

export default register;
