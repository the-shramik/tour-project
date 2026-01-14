import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { confirmBooking } from '../../Redux/API/API';
import { BadgeCheck } from 'lucide-react';

const Success = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentIntentId = urlParams.get('paymentIntentId');
  const bookingId = urlParams.get('bookingId');

  const dispatch = useDispatch();

  console.log(paymentIntentId); // pi_3QVVzzIbVpMcCP6w29zdqSYp
  console.log(bookingId); // 4

  useEffect(() => {
    const response = dispatch(confirmBooking({ bookingId, paymentIntentId }));
    console.log(response, 'confirm response');
  }, [dispatch, bookingId, paymentIntentId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
        <BadgeCheck className="w-16 h-16 mx-auto text-green-500" />
        <h1 className="mt-4 text-2xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="mt-2 text-gray-600">
          Thank you for your payment. Your booking has been successfully confirmed.
        </p>
        <div className="mt-6">
          <a
            href="/user/dashboard"
            className="inline-block px-6 py-3 font-medium text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default Success;
