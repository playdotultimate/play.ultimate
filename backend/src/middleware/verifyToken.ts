import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createError from "../error";
import { JWT } from "../secrets";

interface AuthenticatedRequest extends Request {
  user?: any; // Adjust the type according to your user object structure
}

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated"));

  jwt.verify(token, JWT as string, (err: any, user: any) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.user = user;
    next();
  });
};

export default verifyToken;
