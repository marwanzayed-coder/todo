import { NextFunction, Request, Response } from "express";

export const CheckHeader = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (authorization !== process.env.AUTH_HEADER) {
      res.status(401).send({ msg: "invalid Authorization." });
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({ msg: err.message });
  }
};
