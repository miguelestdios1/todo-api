import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecreto";

export function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Acceso denegado" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Token inválido" });
  }
}