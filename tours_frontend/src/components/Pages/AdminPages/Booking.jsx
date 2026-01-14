import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bookDetails } from "../../../Redux/API/API";

const TourBookingComponent = () => {
  // State management for tour details
  const [tourDetails, setTourDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tourId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await dispatch(bookDetails(tourId));
        setTourDetails(response.payload.data.details);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch ticket summary");
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">
          Loading Tour Details...
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 min-h-screen flex items-center justify-center">
        <div className="text-red-600 font-bold">{error}</div>
      </div>
    );
  }

  // Render tour details
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tour Information Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {tourDetails.tourName}
        </h1>
        <p className="text-gray-600 mb-4">{tourDetails.tourDescription}</p>
        <div className="flex justify-between items-center border-t pt-4">
          <span className="font-semibold text-gray-700">
            Total Tickets Sold:
          </span>
          <span className="text-blue-600 font-bold">
            {tourDetails.ticketsSold}
          </span>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              {[
                "Booking ID",
                "Customer Name",
                "Email",
                "Tickets",
                "Total Price",
                "Booking Date",
                "Payment Status",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tourDetails.bookings.map((booking) => (
              <tr key={booking.bookingId} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.bookingId}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.customerName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.customerEmail}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.numberOfTickets}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${booking.totalPrice.toFixed(2)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`
                      px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        booking.paymentStatus === "SUCCESS"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    `}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TourBookingComponent;
