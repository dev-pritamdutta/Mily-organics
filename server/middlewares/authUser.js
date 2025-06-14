import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  console.log("Cookies:", req.cookies); // <--- debug
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ success: false, message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};




export default authUser;
