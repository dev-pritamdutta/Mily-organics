import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
  console.log("Seller Cookies:", req.cookies);

  const token = req.cookies.sellerToken;
  if (!token) return res.status(403).json({ success: false, message: "No seller token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.status(403).json({ success: false, message: "Unauthorized seller" });
    }
  } catch {
    return res.status(403).json({ success: false, message: "Invalid seller token" });
  }
};



export default authSeller;
