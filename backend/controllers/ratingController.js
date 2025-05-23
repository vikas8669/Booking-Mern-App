const Rating = require("../models/Rating");
const Hotel = require("../models/Hotel");

// Submit or Update Rating
const submitRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const userId = req.user._id; // Assuming auth middleware sets this
    const hotelId = req.params.id;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Check if hotel exists
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Check for existing rating by this user
    const existing = await Rating.findOne({ hotel: hotelId, user: userId });

    if (existing) {
      existing.rating = rating; // Update existing rating
      await existing.save();
    } else {
      const newRating = new Rating({ hotel: hotelId, user: userId, rating });
      await newRating.save(); // Create a new rating
    }

    // Recalculate average rating
    const allRatings = await Rating.find({ hotel: hotelId });
    const avgRating =
      allRatings.reduce((acc, curr) => acc + curr.rating, 0) / allRatings.length;

    // Round the average rating to 1 decimal place
    hotel.averageRating = avgRating.toFixed(1);
    hotel.totalRatings = allRatings.length; // Update total ratings count
    await hotel.save();

    res.status(200).json({
      message: "Rating submitted/updated successfully",
      averageRating: hotel.averageRating, // Return the updated average rating
      totalRatings: hotel.totalRatings, // Return the updated total ratings
    });
  } catch (error) {
    res.status(500).json({ message: "Error submitting rating", error });
  }
};

// Get average rating for a hotel
const getAverageRating = async (req, res) => {
  try {
    const hotelId = req.params.id;

    // Fetch hotel details to get average rating and total ratings count
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // If no ratings exist, return 0 as average rating
    if (!hotel.totalRatings || hotel.totalRatings === 0) {
      return res.json({ averageRating: 0, totalRatings: 0 });
    }

    // Return the average rating and the total number of ratings from the hotel document
    res.json({
      averageRating: hotel.averageRating, // Directly fetch from the hotel model
      totalRatings: hotel.totalRatings, // Directly fetch from the hotel model
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching ratings", error });
  }
};

module.exports = { submitRating, getAverageRating };
