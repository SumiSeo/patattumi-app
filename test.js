const jwt = require('jsonwebtoken');

const secret = 'a_very_long_and_secure_secret_key_with_more_than_32_chars!';

const payload = {
  sub: "1234567890",
  name: "Sumi",
  "https://hasura.io/jwt/claims": {
    "x-hasura-default-role": "user",
    "x-hasura-allowed-roles": ["user", "admin"],
    "x-hasura-user-id": "db26fc1b-3736-4aae-8924-38b86839befe"
  }
};

const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1h' });
console.log(token);
