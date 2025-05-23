const express = require("express");
const router = express.Router();
const { submitRating, getAverageRating } = require("../controllers/ratingController");
const { verifyTokenAndFetchUser } = require("../middleware/authMiddleware");

// Route to submit or update a rating
router.post("/:id/rate", verifyTokenAndFetchUser, async (req, res) => {
  try {
    // Call submitRating controller
    await submitRating(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error submitting rating", error });
  }
});

// Route to get average rating of a hotel
router.get("/:id/average-rating", async (req, res) => {
  try {
    // Call getAverageRating controller
    await getAverageRating(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error fetching average rating", error });
  }
});

module.exports = router;
