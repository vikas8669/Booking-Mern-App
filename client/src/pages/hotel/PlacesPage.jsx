import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

import PlaceImg from "../../components/PlaceImg";
import AccountNav from "../../components/navbars/AccountNav";
import { AuthContext } from "../../context/AuthContext";

const PlacesPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const { data } = await axios.get(
          "https://booking-mern-app-724u.onrender.com/api/hotels/user-places",
          {
            withCredentials: true,
          }
        );
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
        setError("Failed to fetch places. Please try again.");
      }
    };
    fetchPlaces();
  }, []);

  const handleAddHotel = () => {
    navigate("/account/places/new");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8">
      <AccountNav />

      
      <div className="text-center my-6">
        <button
          onClick={handleAddHotel}
          className="inline-flex items-center gap-2 text-lg font-semibold px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300"
        >
          <FaPlus className="w-5 h-5" />
          Add New Hotel
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {/* Places Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {places.length > 0 ? (
          places.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              key={place._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transform transition duration-300"
            >
              <div className="w-full h-48">
                <PlaceImg
                  place={place}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {place.name}
                </h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {place.description}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No hotels found. Start by adding one!
          </p>
        )}
      </div>
    </div>
  );
};

export default PlacesPage;
