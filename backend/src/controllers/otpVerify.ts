import { PrismaClient } from "@prisma/client";
import createError from "../error"; // Assuming this is a custom error handling utility
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT } from "../secrets";

const prisma = new PrismaClient();

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return next(createError(404, "User not found"));
    let isCorrect: boolean = false;
    if (req.body.otp == user.otp) {
      isCorrect = true;
    }
    if (!isCorrect) return next(createError(400, "OTP is not correct"));
    const { password, ...others } = user;
    const token = jwt.sign({ id: user.id }, JWT as string);

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};
