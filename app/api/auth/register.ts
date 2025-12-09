import { RegisterResponse } from "@/types/auth/UserType";
import Constants from "expo-constants";
const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;

const register = async (
  email: string,
  name: string,
  provider: string,
  provider_id: string
): Promise<RegisterResponse> => {
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
    console.error("Sign UP error:", error.message);
    throw error;
  }
};

export default register;
