export interface LoginResponse {
    user_id:string
}


export interface RegisterResponse {
  access_token: string;
  token_type: string;
  email: string;
  role: string;
  id: string;
}
