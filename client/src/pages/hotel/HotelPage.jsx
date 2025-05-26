import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../../components/BookingWidget";
import HotelGallery from "../../components/HotelGallery";
import AddressLink from "../../components/AddressLink";
// import HotelRating from '../../components/Rating';
import { API_URL } from "../../Config";

const HotelPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`${API_URL}/api/hotels/${id}`).then((response) => {
      setHotel(response.data);
    });
  }, [id]);

  if (!hotel) return '';

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-16 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          {hotel.title}
        </h1>
        <AddressLink>{hotel.address}</AddressLink>

        {/* Rating */}
        {/* <div className="my-4 ">
          <div className="bg-white px-6 py-4 rounded-xl shadow-sm w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2">Hotel Rating</h2>
            <HotelRating hotelId={hotel._id} />
          </div>
        </div> */}

        {/* Gallery */}
        <HotelGallery hotel={hotel} />

        {/* Info and Booking */}
        <div className="mt-8 mb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left section: Description */}
          <div className="lg:col-span-2">
            <div className="my-4">
              <h2 className="font-semibold text-xl sm:text-2xl mb-2">Description</h2>
              <p className="text-gray-700 text-sm sm:text-base">
                An updated description for a beautiful beachside hotel.
              </p>
            </div>
            <div className="text-gray-700 text-sm sm:text-base space-y-1">
              <p>Check-in: 15:00</p>
              <p>Check-out: 12:00</p>
              <p>Max guests: 4</p>
            </div>
          </div>

          {/* Right section: Booking */}
          <div className="w-full">
            <BookingWidget hotel={hotel} />
          </div>
        </div>

        {/* Extra Info */}
        <div className="bg-white px-6 py-6 rounded-xl shadow-sm mt-6">
          <h2 className="font-semibold text-xl sm:text-2xl mb-2">Extra Info</h2>
          <p className="text-gray-600 text-sm leading-6">{hotel.extraInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
