import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(403).json({ success: false, message: "Not logged in as seller" });
  }

  try {
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (decoded.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.status(403).json({ success: false, message: "Invalid seller token" });
    }
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};


export default authSeller;
