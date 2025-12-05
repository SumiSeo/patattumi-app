
// FastAPI 서버 URL
const API_URL = "http://127.0.0.1:8000"; // 실제 서버 주소로 바꿔야 함

interface GoogleLoginResponse {
  access_token: string;
  token_type: string;
  email: string;
  role: string;
}

type fetchLoginProps = {
  email: string;
  name: string;
  provider: string;
  provider_id: string;
};
// Google 로그인 후 서버에 토큰 보내고 JWT 받기
const fetchLogin = async (
  email: string,
  name: string,
  provider: string,
  provider_id: string
): Promise<GoogleLoginResponse> => {
  try {
    console.log("called")
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
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Failed to login");
    }

    const data: GoogleLoginResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Google login error:", error.message);
    throw error;
  }
};

export default fetchLogin;