import express from "express";
import {
  createCountryRecordForBlog,
  getAllCountries,
  getCountryDetail,
  getCountryRecordByBlogId,
} from "../services/countryService.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await getAllCountries(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.get("/:name", async (req, res) => {
  const result = await getCountryDetail(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.post("/record", async (req, res) => {
  const result = await createCountryRecordForBlog(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

router.get("/record/:id", async (req, res) => {
  const result = await getCountryRecordByBlogId(req);
  if (!result.success) {
    return res.status(403).json({
      error: result.data,
    });
  }
  res.json(result);
});

export default router;
