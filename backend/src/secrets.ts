import dotenv from "dotenv";
dotenv.config({ path: ".env" });
export const PORT = process.env.PORT;
export const JWT = process.env.JWT;
export const SMTP_HOST = process.env.SMPT_HOST;
export const SMTP_PORT = process.env.SMTP_PORT;
export const SMTP_MAIL = process.env.SMTP_MAIL;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
