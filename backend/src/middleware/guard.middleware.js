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

const invalid = async (res)=>{
  res.cookie('authToken',null, {
    httpOnly: true,
    secure: process.env.ENVIRONMENT !== "DEV",
    sameSite : process.env.ENVIRONMENT === "DEV" ? "lax": "none",
    path : "/",
    domain : undefined,
    maxAge: 0,
  })
  res.status(400).json({message: 'Bad request'});
}

export const AdminUserGuard = async (req, res, next) => {
  const {authToken} = req.cookies;
  if(!authToken)
    return invalid(res);

  const payload = await jwt.verify(authToken, process.env.AUTH_SECRET);
  if(payload.role !== "user" && payload.role !== "admin")
    return invalid(res);

  req.user = payload;
  next();
};
