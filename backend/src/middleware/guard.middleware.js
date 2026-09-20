import jwt from "jsonwebtoken";

export const verifyTokenGuard = async (req, res, next) => {
  const authorization = req.headers['authorization'];
  if (!authorization) 
    return res.status(400).send("Bad request");
  const [type, token] = authorization.split(" ");
  if(type !== "Bearer")
    return res.status(400).send("Bad request");

  const payload = await jwt.verify(token, process.env.FORGOT_TOKEN_SECRET);
  console.log(payload);
  req.user = payload;
  next();
};
