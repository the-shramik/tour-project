import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allTickets } from "../../../Redux/API/API";

const TicketSummaryComponent = () => {
  // State management for ticket summary
  const [ticketSummary, setTicketSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTicketSummary = async () => {
      try {
        const response = await dispatch(allTickets());

        setTicketSummary(response.payload.data.summary);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch ticket summary");
        setLoading(false);
      }
    };

    fetchTicketSummary();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">
          Loading Ticket Summary...
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

  // Calculate total metrics
  const totalTicketsSold = ticketSummary.reduce(
    (sum, tour) => sum + tour.ticketsSold,
    0
  );
  const totalTicketsAvailable = ticketSummary.reduce(
    (sum, tour) => sum + tour.ticketsAvailable,
    0
  );
  const totalRevenue = ticketSummary.reduce(
    (sum, tour) => sum + tour.totalRevenue,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Overall Summary Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Ticket Summary Overview
        </h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">
              Total Tickets Sold
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {totalTicketsSold}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">
              Total Tickets Available
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {totalTicketsAvailable}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold text-purple-600">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Tour Summary Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              {[
                "Tour ID",
                "Tour Name",
                "Tickets Sold",
                "Tickets Available",
                "Total Revenue",
                "Bookings",
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
            {ticketSummary.map((tour) => (
              <tr key={tour.tourId} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tour.tourId}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {tour.tourName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {tour.ticketsSold}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`
                      px-2 py-1 rounded-full
                      ${
                        tour.ticketsAvailable === 0
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }
                    `}
                  >
                    {tour.ticketsAvailable}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-purple-600">
                  ${tour.totalRevenue.toFixed(2)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => navigate(`/admin/book/${tour.tourId}`)}
                    className="px-3 py-1.5 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    Booking Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketSummaryComponent;
