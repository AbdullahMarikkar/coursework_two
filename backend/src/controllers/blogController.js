import express from "express";
import {
  createBlogService,
  deleteBlogService,
  getBlogsByUserIdService,
  updateBlogService,
  searchBlogPostsService,
  getBlogById,
} from "../services/blogService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const result = await createBlogService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.get("/byUser/:id", async (req, res) => {
  const result = await getBlogsByUserIdService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.put("/:id", async (req, res) => {
  const result = await updateBlogService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await deleteBlogService(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

// router.get("/search", async (req, res) => {
//   const result = await searchBlogPostsService(req);
//   if (!result.success) {
//     return res.status(403).json({
//       error: result.data,
//     });
//   }
//   res.json(result);
// });

router.get("/:id", async (req, res) => {
  const result = await getBlogById(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

export default router;
