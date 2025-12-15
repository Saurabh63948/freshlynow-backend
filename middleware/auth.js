import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token =
      req.cookies?.accessToken ||
      (authHeader && authHeader.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "Provide token" });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRETE_KEY_ACCESS_TOKEN
    );

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = decoded.id;
    req.role = decoded.role; 

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default auth;
