import React, { useState } from "react";

const TransportUpdateModal = ({
  isOpen,
  onClose,
  initialTransport,
  onUpdateTransport,
}) => {
  const [transport, setTransport] = useState(initialTransport);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTransport(transport);
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transport Description
            </label>
            <textarea
              name="transportDescription"
              value={transport.transportDescription}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estimated Travel Time
            </label>
            <input
              type="text"
              name="estimatedTravelTime"
              value={transport.estimatedTravelTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
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
