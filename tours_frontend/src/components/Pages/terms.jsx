import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to [Your Travel Website Name]! By accessing our website and
          booking our services, you agree to comply with and be bound by the
          following terms and conditions.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            1. Booking and Payment
          </h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>All bookings are subject to availability.</li>
            <li>
              Payment must be made in full at the time of booking unless
              otherwise specified.
            </li>
            <li>
              We reserve the right to cancel your booking if payment is not
              received on time.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            2. Cancellations and Refunds
          </h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              Cancellations must be made at least 7 days prior to the scheduled
              travel date to be eligible for a refund.
            </li>
            <li>
              Refunds will not be issued for no-shows or late cancellations.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            3. Travel Insurance
          </h2>
          <p className="text-gray-600">
            We strongly recommend purchasing travel insurance to cover
            unforeseen circumstances such as trip cancellations, medical
            emergencies, or lost baggage.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            4. Liability
          </h2>
          <p className="text-gray-600">
            We are not responsible for any injury, loss, or damage incurred
            during your travels. Travelers are responsible for their own safety
            and belongings.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            5. Changes to Terms
          </h2>
          <p className="text-gray-600">
            We reserve the right to modify these terms at any time without prior
            notice. Please review this page periodically for updates.
          </p>
        </section>

        <p className="text-gray-600">
          If you have any questions about our Terms of Service, please contact
          us at{" "}
          <a
            href="mailto:support@yourtravelwebsite.com"
            className="text-blue-500 underline"
          >
            support@yourtravelwebsite.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
