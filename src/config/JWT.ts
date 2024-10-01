import { config } from "dotenv";

config();

export const jwtConstants = {
  expiresIn: "15m",
  defaultStrategy: "jwt",
  secret: process.env.JWT_SECRET,
};
