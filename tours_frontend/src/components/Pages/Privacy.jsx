import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-6">
          At [Your Travel Website Name], we value your privacy and are committed
          to protecting your personal information. This Privacy Policy outlines
          how we collect, use, and safeguard your data when you use our
          services.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, and payment details when you make a booking.
            </li>
            <li>
              <strong>Non-Personal Information:</strong> Browser type, device
              information, and browsing patterns for analytics purposes.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>To process your bookings and payments.</li>
            <li>
              To send booking confirmations, updates, and promotional offers.
            </li>
            <li>To improve our website and customer experience.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            3. Sharing Your Information
          </h2>
          <p className="text-gray-600">
            We do not sell or rent your personal information to third parties.
            However, we may share your information with:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              Trusted third-party partners to process payments or provide
              services.
            </li>
            <li>Law enforcement or regulatory bodies when required by law.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            4. Data Security
          </h2>
          <p className="text-gray-600">
            We implement appropriate technical and organizational measures to
            safeguard your data. However, no online transmission or storage is
            completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            5. Cookies
          </h2>
          <p className="text-gray-600">
            We use cookies to enhance your browsing experience. You can disable
            cookies in your browser settings, but this may limit some features
            of our website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            6. Your Rights
          </h2>
          <p className="text-gray-600">
            You have the right to access, correct, or delete your personal
            information. Contact us at{" "}
            <a
              href="mailto:support@yourtravelwebsite.com"
              className="text-blue-500 underline"
            >
              support@yourtravelwebsite.com
            </a>{" "}
            for assistance.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            7. Changes to This Policy
          </h2>
          <p className="text-gray-600">
            We may update this Privacy Policy periodically. Changes will be
            posted on this page, and we encourage you to review it regularly.
          </p>
        </section>

        <p className="text-gray-600">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
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

export default PrivacyPolicy;
