import createResponse from "../utils/createResponse.js";
import { verifyAccessToken } from "../utils/jwtUtil.js";
function checkSession(req, res, next) {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;
    if (!req.session.isAuthenticated) {
      return res.status(401).json({ error: "Invalid User!" });
      // res.redirect("/login");
    }
    if (!req.cookies.accessToken) {
      return res
        .status(401)
        .json({ error: "Invalid User!, Couldn't Find Access Token" });
    }

    const accessToken = req.cookies.accessToken;
    const verified = verifyAccessToken(accessToken, SECRET_KEY);
    if (!verified) {
      return res
        .status(401)
        .json({ error: "Access Token Verification Failed" });
    }
    next();
  } catch (err) {
    createResponse(false, err);
  }
}

export default checkSession;
