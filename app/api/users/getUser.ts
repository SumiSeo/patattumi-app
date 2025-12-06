import Constants from "expo-constants";

const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
console.log("ISDEV ? ", __DEV__);
export const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;

interface UserResponse {
  id: string;
  email: string;
  name: string;
  age: string;
  korean_name: string;
  totem: string;
}

type LoginProps = {
  id: string;
};

const fetchUserById = async ({ id }: LoginProps): Promise<UserResponse> => {
  try {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Failed to Sign UP");
    }
    const data: UserResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Google login error:", error.message);
    throw error;
  }
};

export default fetchUserById;
