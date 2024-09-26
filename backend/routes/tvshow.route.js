import express from "express";
import { getTrendingtvshows, gettvshowTrailers, gettvshowDetails, getSimilartvshows, gettvshowsByCategory } from "../controllers/tvshow.controller.js";

const router = express.Router();

router.get("/trending", getTrendingtvshows);
router.get("/:id/trailers", gettvshowTrailers);
router.get("/:id/details", gettvshowDetails);
router.get("/:id/similar", getSimilartvshows);
router.get("/:category", gettvshowsByCategory);

export default router;