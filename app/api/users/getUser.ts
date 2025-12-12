import Constants from "expo-constants";

const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
export const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;

interface UserResponse {
  id: string;
  email: string;
  name: string;
  age: string;
  korean_name: string;
  totem: string;
  role: string;
  provider: string;
}

const fetchUserById = async (userId: string): Promise<UserResponse> => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Failed to fetch User");
    }
    const data: UserResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Fetch User error:", error.message);
    throw error;
  }
};

export default fetchUserById;
