import express from "express";
import {
  authenticateUserService,
  createUserService,
  getUserDetailsById,
  getCurrentSession,
  logoutUserService,
} from "../services/authService.js";
import sessionMiddleware from "../middleware/sessionMiddleware.js";

const router = express.Router();

router.get("/isLoggedIn", sessionMiddleware, (req, res) => {
  if (req.session && req.session.isAuthenticated) {
    res.json({
      isAuthenticated: true,
      user: req.session.user,
    });
  } else {
    res.json({
      isAuthenticated: false,
    });
  }
});

router.post("/register", async (req, res) => {
  const result = await createUserService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.post("/login", async (req, res) => {
  const result = await authenticateUserService(req, res);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.post("/logout", async (req, res) => {
  const result = await logoutUserService(req, res);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const result = await getUserDetailsById(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.get("/check/me", async (req, res) => {
  const result = await getCurrentSession(req);
  if (!result.success) {
    return res.status(403).json({
      error: result,
    });
  }
  res.json(result);
});

export default router;
