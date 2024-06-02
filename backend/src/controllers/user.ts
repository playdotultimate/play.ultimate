import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import createError from "../error";

const prisma = new PrismaClient();

export const update = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const ID: number = parseInt(req.params.id, 10);
  const ID1: number = req.user.id as number;
  console.log(ID);
  if (ID === ID1) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: ID },
        data: req.body,
      });
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only update your account"));
  }
};

export const deleteUser = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const ID: number = parseInt(req.params.id, 10);
  if (ID === req.user.id) {
    try {
      await prisma.user.delete({
        where: { id: ID },
      });
      res.status(200).json("User has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only delete your account"));
  }
};

export const getUser = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const ID: number = parseInt(req.params.id, 10);
    const user = await prisma.user.findUnique({
      where: { id: ID },
    });
    if (user) {
      const { password, ...others } = user;
      res.status(200).json(others);
    } else {
      next(createError(404, "User not found"));
    }
  } catch (err) {
    next(err);
  }
};
