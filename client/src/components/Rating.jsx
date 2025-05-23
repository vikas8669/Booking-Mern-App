import React, { useState, useEffect } from "react";
import axios from "axios";

const HotelRating = ({ hotelId }) => {
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const fetchAverageRating = async () => {
    if (!hotelId) {
      setMessage("Hotel ID is missing. Please provide a valid hotel.");
      return;
    }

    try {
      const res = await axios.get(`/api/ratings/${hotelId}/average-rating`);
      if (res.data && res.data.averageRating !== undefined && res.data.totalRatings !== undefined) {
        setAverageRating(res.data.averageRating);
        setTotalRatings(res.data.totalRatings);
      } else {
        setMessage("Invalid response from server.");
      }
    } catch (err) {
      console.error("Failed to fetch rating", err);
      setMessage("Could not load the average rating.");
    }
  };

  const submitRating = async (e) => {
    e.preventDefault();

    if (!hotelId) {
      return setMessage("Hotel ID is missing. Please provide a valid hotel.");
    }

    if (userRating < 1 || userRating > 5) {
      return setMessage("Rating must be between 1 and 5");
    }

    try {
      setLoading(true);
      const res = await axios.post(`/api/ratings/${hotelId}/rate`, { rating: userRating });

      if (res.data && res.data.message) {
        setMessage(res.data.message);
        setAverageRating(res.data.averageRating);
        setTotalRatings(res.data.totalRatings);
        setRatingSubmitted(true);
      } else {
        setMessage("Invalid response from server.");
      }
    } catch (err) {
      console.error("Error submitting rating", err);
      setMessage("Could not submit rating, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Received hotelId:", hotelId);
    if (!hotelId) {
      setMessage("Hotel ID is missing. Please provide a valid hotel.");
      return;
    }
    fetchAverageRating();
  }, [hotelId]);

  return (
    <div className="p-4 max-w-md bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Rate this Hotel</h2>

      <form onSubmit={submitRating} className="space-y-2">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              type="button"
              key={num}
              className={`text-2xl ${num <= userRating ? "text-yellow-500" : "text-gray-400"}`}
              onClick={() => setUserRating(num)}
              disabled={ratingSubmitted}
            >
              ★
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || userRating === 0}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit Rating"}
        </button>
      </form>

      {message && (
        <p className={`text-sm ${message.includes("Could not") ? "text-red-600" : "text-green-600"}`}>
          {message}
        </p>
      )}

      <div className="text-sm text-gray-700">
        <p>⭐ Average Rating: <strong>{averageRating}</strong></p>
        <p>🗳️ Total Ratings: <strong>{totalRatings}</strong></p>
      </div>

      {ratingSubmitted && (
        <p className="text-blue-500">Thank you for submitting your rating!</p>
      )}
    </div>
  );
};

export default HotelRating;
