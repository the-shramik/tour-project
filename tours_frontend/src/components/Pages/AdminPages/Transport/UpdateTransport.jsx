import React, { useState } from "react";

const TransportUpdateModal = ({
  isOpen,
  onClose,
  initialTransport,
  onUpdateTransport,
}) => {
  const [transport, setTransport] = useState(initialTransport);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransport((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!transport.transportName?.trim()) {
      newErrors.transportName = "Transport name is required";
    } else if (transport.transportName.trim().length < 2) {
      newErrors.transportName = "Transport name must be at least 2 characters";
    }

    if (!transport.transportType?.trim()) {
      newErrors.transportType = "Transport type is required";
    }

    if (!transport.transportDescription?.trim()) {
      newErrors.transportDescription = "Transport description is required";
    } else if (transport.transportDescription.trim().length < 10) {
      newErrors.transportDescription =
        "Description must be at least 10 characters";
    }

    if (!transport.estimatedTravelTime?.trim()) {
      newErrors.estimatedTravelTime = "Estimated travel time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdateTransport(transport);
    }
  };

  // Error message component
  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return <p className="mt-1 text-sm text-red-500">{error}</p>;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Transport Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transport Name
            </label>
            <input
              type="text"
              name="transportName"
              value={transport.transportName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${
                errors.transportName ? "border-red-500" : "border-gray-300"
              }`}
            />
            <ErrorMessage error={errors.transportName} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transport Type
            </label>
            <input
              type="text"
              name="transportType"
              value={transport.transportType}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${
                errors.transportType ? "border-red-500" : "border-gray-300"
              }`}
            />
            <ErrorMessage error={errors.transportType} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transport Description
            </label>
            <textarea
              name="transportDescription"
              value={transport.transportDescription}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${
                errors.transportDescription ? "border-red-500" : "border-gray-300"
              }`}
              rows="3"
            />
            <ErrorMessage error={errors.transportDescription} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estimated Travel Time
            </label>
            <input
              type="text"
              name="estimatedTravelTime"
              placeholder="2hr 30mins"
              value={transport.estimatedTravelTime}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${
                errors.estimatedTravelTime ? "border-red-500" : "border-gray-300"
              }`}
            />
            <ErrorMessage error={errors.estimatedTravelTime} />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Update Transport
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransportUpdateModal;