import Constants from "expo-constants";

const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;

const deleteAppleUser = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/users/apple/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Failed to Delete apple id");
    }
    if (response.status === 204) 
      return null; 

    const text = await response.text();
    return text;
  } catch (error: any) {
    console.error("apple login error:", error.message);
    throw error;
  }
};

export default deleteAppleUser;
