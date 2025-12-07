import Constants from "expo-constants";

const { DEV_PATATTUMI_API_URL, PROD_PATATTUMI_API_URL } =
  Constants.expoConfig?.extra ?? {};
const API_URL = __DEV__ ? DEV_PATATTUMI_API_URL : PROD_PATATTUMI_API_URL;



const deleteGoogleUser = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/users/google/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Failed to Delete google id");
    }
    if (response.status === 204) 
      return null; 

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error: any) {
    console.error("Google login error:", error.message);
    throw error;
  }
};

export default deleteGoogleUser;
