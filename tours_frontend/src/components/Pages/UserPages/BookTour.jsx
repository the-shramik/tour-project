import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userBook } from '../../../Redux/API/API';

const BookTour = ({ tourId, isOpen, onClose, ticketsAvailable }) => {
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation checks
    if (numberOfTickets <= 0) {
      setError('Please select at least 1 ticket');
      return;
    }

    if (numberOfTickets > ticketsAvailable) {
      setError(`Only ${ticketsAvailable} tickets are available`);
      return;
    }

    setIsLoading(true);
    setError(null);
  
    try {
      const response = await dispatch(
        userBook({ tourId, numberOfTickets })
      ).unwrap();

      if (response && response.checkoutUrl) {
        window.location.href = response.checkoutUrl;
      }
    } catch (err) {
      setError(err?.message || 'Booking failed. Please try again.');
      console.error("Booking error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white shadow-xl rounded-xl w-96">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Book Tickets</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="ticketCount" 
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Number of Tickets
            </label>
            <input
              type="number"
              id="ticketCount"
              value={numberOfTickets}
              onChange={(e) => {
                const value = Number(e.target.value);
                setNumberOfTickets(value);
                setError(null);
              }}
              min="1"
              max={ticketsAvailable}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <p className="mt-1 text-sm text-gray-500">
              Available tickets: {ticketsAvailable}
            </p>
          </div>

          {error && (
            <div className="p-3 text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-gray-600 transition-colors border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 text-white rounded-md transition-colors ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Booking...' : 'Book Tickets'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookTour;