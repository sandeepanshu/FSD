import jwt from "jsonwebtoken";
import express from "express";

interface Payload {
  user: {
    id: string;
    name: string;
  };
}

const verifyToken = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  const token: string | undefined = request.headers["x-auth-token"] as
    | string
    | undefined;

  if (!token) {
    return response
      .status(401)
      .json({ errors: [{ msg: "NO Token Provided, Access Denied" }] });
  }

  try {
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as Payload;

    request.headers["user"] = JSON.stringify(decode.user);
    next();
  } catch (error) {
    console.error({ msg: "Invalid Token Provided" });
    return response
      .status(401)
      .json({ errors: [{ msg: "Invalid Token Provided" }] });
  }
};

export default verifyToken;
