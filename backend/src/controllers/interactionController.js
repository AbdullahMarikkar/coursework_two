import express from "express";
import {
  addCommentService,
  deleteCommentService,
  followUser,
  getAllCommentsService,
  getDashboardContentService,
  getFollowersService,
  getFollowingService,
  getLikeAndDislikeCountService,
  getLikeStateService,
  likeService,
} from "../services/interactionService.js";
const router = express.Router();

router.post("/follow/:id", async (req, res) => {
  const result = await followUser(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.get("/followers/:id", async (req, res) => {
  const result = await getFollowersService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.get("/following/:id", async (req, res) => {
  const result = await getFollowingService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.post("/comment/:id", async (req, res) => {
  const result = await addCommentService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.delete("/comment/:id", async (req, res) => {
  const result = await deleteCommentService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.get("/comment/:id", async (req, res) => {
  const result = await getAllCommentsService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.post("/like/:id", async (req, res) => {
  const result = await likeService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.get("/like/:id", async (req, res) => {
  const result = await getLikeStateService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.get("/likeCount/:id", async (req, res) => {
  const result = await getLikeAndDislikeCountService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

export default router;
