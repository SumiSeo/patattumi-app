import jsonwebtoken from "jsonwebtoken";

export function createToken(role:string, user_id:string) {
  const secret = "a_very_long_and_secure_secret_key_with_more_than_32_chars!";

  const payload = {
    sub: "1234567890",
    name: "Sumi",
    "https://hasura.io/jwt/claims": {
      "x-hasura-default-role": role,
      "x-hasura-allowed-roles": ["user", "admin"],
      "x-hasura-user-id": user_id
    },
  };

  const token = jsonwebtoken.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "1h",
  });

  console.log(token)
  return token;
}
