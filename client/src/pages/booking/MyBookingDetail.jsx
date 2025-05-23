import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AddressLink from "../../components/AddressLink";
import AccountNav from '../../components/navbars/AccountNav';
import PlaceImg from '../../components/PlaceImg';
import BookingDates from '../../components/BookingDates';
import HotelGallery from '../../components/HotelGallery';
import { AuthContext } from '../../context/AuthContext';

import { FaBed, FaUsers, FaClipboardList, FaRegClock } from 'react-icons/fa';
import { BsDoorOpenFill } from "react-icons/bs";
import { API_URL } from "../../Config";

const MyBookingDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/api/bookings/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data); // Log the API response to inspect the data
          setBooking(response.data);
        })
        .catch((error) => {
          console.error('Error fetching booking details:', error);
        });
    }
  }, [id]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 pb-12">
      <div className="container max-w-5xl mx-auto px-4">
        <AccountNav />

        <div className="mt-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header Image */}
          <div className="h-72 w-full">
            <PlaceImg place={booking.hotelId} className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                {booking.hotelId.name}
              </h2>
              <AddressLink className="text-sm text-blue-600 font-medium">
                {booking.hotelId.address}
              </AddressLink>
              <BookingDates booking={booking} className="mt-1 text-sm text-gray-500" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-3 items-center text-gray-700">
                <FaUsers className="text-indigo-600 text-xl" />
                <p><span className="font-semibold">User:</span> {booking.userId.name} ({booking.userId.email})</p>
              </div>
              <div className="flex gap-3 items-center text-gray-700">
                <FaBed className="text-indigo-600 text-xl" />
                <p><span className="font-semibold">Room Type:</span> {booking.roomType}</p>
              </div>
              <div className="flex gap-3 items-center text-gray-700">
                <FaClipboardList className="text-indigo-600 text-xl" />
                <p><span className="font-semibold">Special Requests:</span> {booking.specialRequests || 'None'}</p>
              </div>
              <div className="flex gap-3 items-center text-gray-700">
                <BsDoorOpenFill className="text-indigo-600 text-xl" />
                <p><span className="font-semibold">Number of Rooms:</span> {booking.numberOfRooms}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 text-lg pt-4">
              <FaRegClock className="text-indigo-600" />
              <p>
                <span className="font-semibold">Booking Date:</span> 
                {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>

            <div className="flex items-center gap-3 text-2xl font-bold text-gray-800 pt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-indigo-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
              <span>Total Price: ₹{booking.totalPrice}</span>
            </div>

            {/* Gallery */}
            <div className="pt-8">
              <HotelGallery hotel={booking.hotelId} />
            </div>

            {/* Back Link */}
            <div className="pt-6">
              <Link
                to="/account/bookings"
                className="text-blue-600 hover:text-blue-800 font-medium transition-all"
              >
                ← Back to Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingDetail;
