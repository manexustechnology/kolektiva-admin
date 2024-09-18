import { adminJwtConstants } from "@/constants/jwt.constants";
import { SignJWT } from "jose";

export const generateJWTBearerForAdmin = async (email: string) => {
  const alg = "HS256";
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuedAt()
    .setIssuer("kolektiva")
    .setAudience("kolektiva")
    .setExpirationTime("5m")
    .sign(Buffer.from(adminJwtConstants.secret));

  return token;
};
