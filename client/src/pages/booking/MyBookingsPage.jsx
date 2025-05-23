import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AccountNav from '../../components/navbars/AccountNav';
import PlaceImg from '../../components/PlaceImg';
import BookingDates from '../../components/BookingDates';
import { format } from 'date-fns';
import { API_URL } from '../../Config';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/bookings/user-bookings/`, {
        withCredentials: true,
      })
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching all bookings details:', error);
      });
  }, []);

  const formatDate = (date) => {
    let validDate = typeof date === 'number' ? new Date(date) : new Date(date);
    return isNaN(validDate) ? 'Invalid Date' : format(validDate, 'dd MMM yyyy');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 py-10">
      <AccountNav />
      <div className="container max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">My Bookings</h1>

        {bookings.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <Link
                to={`/account/bookings/${booking._id}`}
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] overflow-hidden"
              >
                <div className="h-48 w-full overflow-hidden">
                  <PlaceImg place={booking.hotelId} className="w-full h-full object-cover" />
                </div>

                <div className="p-4 flex flex-col justify-between h-48">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                      {booking.hotelId.name}
                    </h2>
                    <BookingDates booking={booking} className="text-sm text-gray-500 mt-1" />
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-indigo-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>
                      ₹{booking.totalPrice}
                    </div>

                    <span className="text-xs text-gray-400 italic">
                      Updated: {formatDate(booking.updatedAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20 text-gray-600">
            <p className="text-xl font-semibold">No bookings found.</p>
            <p className="mt-2 text-sm">You haven’t made any bookings yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
