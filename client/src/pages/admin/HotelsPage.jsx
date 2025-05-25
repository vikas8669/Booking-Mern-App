import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import PlaceImg from "../../components/PlaceImg";   
import PhotosUploader from "../../components/PhotosUploader";
import Perks from "../../components/Perks";

const HotelsPage = () => {
  const { auth } = useContext(AuthContext);
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    photos: [],
    amenities: [],
  });
  const [editingHotelId, setEditingHotelId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [amenitiesFilter, setAmenitiesFilter] = useState("");

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data } = await axios.get("/api/v1/hotel/all-hotels");
      setHotels(data?.hotels || []);
    } catch (error) {
      console.error("Failed to fetch hotels", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (photos) => {
    setFormData({ ...formData, photos });
  };

  const handleAmenitiesChange = (selectedAmenities) => {
    setFormData({ ...formData, amenities: selectedAmenities });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/hotel/create-hotel", formData, {
        headers: {
          Authorization: auth?.token,
        },
      });
      fetchHotels();
      resetForm();
    } catch (error) {
      console.error("Failed to create hotel", error);
    }
  };

  const handleEdit = (hotel) => {
    setEditingHotelId(hotel._id);
    setFormData({
      name: hotel.name,
      description: hotel.description,
      price: hotel.price,
      photos: hotel.photos,
      amenities: hotel.amenities,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/hotel/update-hotel/${editingHotelId}`, formData, {
        headers: {
          Authorization: auth?.token,
        },
      });
      fetchHotels();
      setEditingHotelId(null);
      resetForm();
    } catch (error) {
      console.error("Failed to update hotel", error);
    }
  };

  const handleDelete = async (hotelId) => {
    try {
      await axios.delete(`/api/v1/hotel/delete-hotel/${hotelId}`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      fetchHotels();
    } catch (error) {
      console.error("Failed to delete hotel", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingHotelId(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      photos: [],
      amenities: [],
    });
  };

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceFilter ? parseFloat(hotel.price) <= parseFloat(priceFilter) : true;
    const matchesAmenities = amenitiesFilter
      ? hotel.amenities?.includes(amenitiesFilter)
      : true;
    return matchesSearch && matchesPrice && matchesAmenities;
  });

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Manage Hotels</h1>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/2"
        />

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full sm:w-auto"
          >
            <option value="">Filter by Price</option>
            <option value="100">Under ₹100</option>
            <option value="500">Under ₹500</option>
            <option value="1000">Under ₹1000</option>
          </select>

          <select
            value={amenitiesFilter}
            onChange={(e) => setAmenitiesFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full sm:w-auto"
          >
            <option value="">Filter by Amenities</option>
            <option value="Free WiFi">Free WiFi</option>
            <option value="Pool">Pool</option>
            <option value="Parking">Parking</option>
            <option value="Restaurant">Restaurant</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hotel Form */}
        <form
          onSubmit={editingHotelId ? handleUpdate : handleSubmit}
          className="bg-white p-4 rounded-md shadow-md space-y-4"
        >
          <h2 className="text-lg font-semibold">
            {editingHotelId ? "Edit Hotel" : "Create Hotel"}
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Hotel Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <PhotosUploader photos={formData.photos} onChange={handlePhotoChange} />
          <Perks selected={formData.amenities} onChange={handleAmenitiesChange} />

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-auto"
            >
              {editingHotelId ? "Update" : "Create"}
            </button>
            {editingHotelId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-400 text-white px-4 py-2 rounded-md w-full sm:w-auto"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Hotel List */}
        <div className="space-y-4">
          {filteredHotels.length === 0 ? (
            <p className="text-gray-600 text-center sm:text-left">No hotels found.</p>
          ) : (
            filteredHotels.map((hotel) => (
              <div key={hotel._id} className="bg-white p-4 rounded-md shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24">
                      <PlaceImg
                        hotel={hotel}
                        index={0}
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{hotel.name}</h3>
                      <p className="text-sm text-gray-600 mb-1 truncate">{hotel.description}</p>
                      <p className="text-sm text-green-700 font-semibold">₹{hotel.price}</p>
                      <div className="flex flex-wrap gap-1 mt-1 text-xs text-gray-500">
                        {hotel.amenities?.map((a, i) => (
                          <span key={i} className="bg-gray-100 px-2 py-1 rounded-full">{a}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 sm:mt-0">
                    <button
                      onClick={() => handleEdit(hotel)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(hotel._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;
